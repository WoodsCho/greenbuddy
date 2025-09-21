import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface PureThreeViewerProps {
    modelPath: string;
    className?: string;
}

const PureThreeViewer: React.FC<PureThreeViewerProps> = ({ modelPath, className }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const controlsRef = useRef<OrbitControls>();
    const frameIdRef = useRef<number>();
    const modelRef = useRef<THREE.Object3D>();

    const [loadingStatus, setLoadingStatus] = useState<string>('초기화 중...');
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!mountRef.current) return;

        const mount = mountRef.current;
        setLoadingStatus('3D 엔진 초기화 중...');

        // Scene 설정 - 흰색 배경
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        sceneRef.current = scene;

        // Camera 설정 - 1.5배 가깝게 이동
        const camera = new THREE.PerspectiveCamera(
            60,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        camera.position.set(3.3, 2, 5.3);
        cameraRef.current = camera;

        // Renderer 설정
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;

        mount.appendChild(renderer.domElement);

        // Controls 설정 - 자동 회전 제거
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1.5;
        controls.maxDistance = 30;
        controls.maxPolarAngle = Math.PI / 2;
        controls.autoRotate = false;
        controlsRef.current = controls;

        // 밝은 조명 설정
        const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
        scene.add(ambientLight);

        // 메인 조명 - 훨씬 밝게
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // 보조 조명들 - 밝기 증가
        const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
        frontLight.position.set(-5, 5, 5);
        scene.add(frontLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.6);
        backLight.position.set(0, 5, -10);
        scene.add(backLight);

        // 수경재배 관련 색상 조명 (밝게 조정)
        const plantLight = new THREE.PointLight(0x4CAF50, 0.8, 50);
        plantLight.position.set(2, 4, 2);
        scene.add(plantLight);

        const waterLight = new THREE.PointLight(0x2196F3, 0.6, 30);
        waterLight.position.set(-3, 2, -2);
        scene.add(waterLight);

        // LED 성장등 시뮬레이션
        const growLight1 = new THREE.SpotLight(0xFF1493, 0.5);
        growLight1.position.set(-2, 6, 0);
        growLight1.target.position.set(-2, 0, 0);
        scene.add(growLight1);
        scene.add(growLight1.target);

        const growLight2 = new THREE.SpotLight(0x9932CC, 0.5);
        growLight2.position.set(2, 6, 0);
        growLight2.target.position.set(2, 0, 0);
        scene.add(growLight2);
        scene.add(growLight2.target);

        // 바닥 생성 - 밝은 회색으로 변경
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xf0f0f0,
            transparent: true,
            opacity: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2;
        floor.receiveShadow = true;
        scene.add(floor);

        setLoadingStatus('3D 모델 로딩 중...');

        // 모델 로드 - 오류 처리 개선
        const loader = new GLTFLoader();

        // 파일 존재 여부 먼저 확인
        fetch(modelPath, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`모델 파일을 찾을 수 없습니다: ${modelPath}`);
                }

                // 파일이 존재하면 로드 시도
                loader.load(
                    modelPath,
                    (gltf: GLTF) => {
                        const model = gltf.scene;
                        modelRef.current = model;

                        // 모델 설정
                        model.traverse((child: THREE.Object3D) => {
                            if (child instanceof THREE.Mesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;

                                if (child.material) {
                                    child.material.needsUpdate = true;
                                    if (child.material instanceof THREE.MeshStandardMaterial) {
                                        child.material.emissive.setHex(0x111111);
                                    }
                                }
                            }
                        });

                        // 모델 크기 및 위치 조정
                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        const size = box.getSize(new THREE.Vector3());

                        model.position.sub(center);
                        const maxDim = Math.max(size.x, size.y, size.z);
                        const scale = 7 / maxDim;
                        model.scale.setScalar(scale);
                        model.position.y = -1.5;

                        scene.add(model);
                        setIsModelLoaded(true);
                        setHasError(false);
                        setLoadingStatus('로딩 완료!');

                        console.log('수경재배 모델 로드 완료!');
                    },
                    (progress: ProgressEvent<EventTarget>) => {
                        const percentage = Math.round((progress.loaded / progress.total) * 100);
                        setLoadingStatus(`모델 로딩 중... ${percentage}%`);
                    },
                    (error: ErrorEvent) => {
                        console.error('모델 로딩 실패:', error);
                        setLoadingStatus('모델 로딩 실패 - 기본 모델 표시');
                        setHasError(true);

                        // 플레이스홀더 생성
                        createPlaceholderModel(scene);
                        setIsModelLoaded(true);
                    }
                );
            })
            .catch((error) => {
                console.error('모델 파일 확인 실패:', error);
                setLoadingStatus('모델 파일을 찾을 수 없음 - 기본 모델 표시');
                setHasError(true);

                // 플레이스홀더 생성
                createPlaceholderModel(scene);
                setIsModelLoaded(true);
            });

        // 애니메이션 루프
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            controls.update();

            // 조명 애니메이션 (부드럽게)
            const time = Date.now() * 0.001;
            plantLight.position.x = Math.sin(time * 0.3) * 2;
            waterLight.position.z = Math.cos(time * 0.2) * 2;

            // LED 성장등 깜빡임 효과
            growLight1.intensity = 0.4 + Math.sin(time * 2) * 0.1;
            growLight2.intensity = 0.4 + Math.cos(time * 2.5) * 0.1;

            renderer.render(scene, camera);
        };
        animate();

        // 리사이즈 핸들러
        const handleResize = () => {
            if (!mount || !camera || !renderer) return;

            const width = mount.clientWidth;
            const height = mount.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            if (controlsRef.current) {
                controlsRef.current.dispose();
            }

            if (rendererRef.current && mount) {
                mount.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }

            scene.clear();
        };
    }, [modelPath]);

    // 플레이스홀더 모델 생성 함수 (밝은 색상으로 변경)
    const createPlaceholderModel = (scene: THREE.Scene) => {
        const group = new THREE.Group();

        // 수경재배 베드 - 밝은 갈색
        const bedGeometry = new THREE.BoxGeometry(4, 0.2, 1);
        const bedMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });

        for (let i = 0; i < 3; i++) {
            const bed = new THREE.Mesh(bedGeometry, bedMaterial);
            bed.position.set(0, i * 0.8, 0);
            bed.castShadow = true;
            bed.receiveShadow = true;
            group.add(bed);

            // 식물 - 밝은 녹색
            for (let j = -1.5; j <= 1.5; j += 0.5) {
                const plantGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
                const plantMaterial = new THREE.MeshPhongMaterial({
                    color: 0x32CD32,
                    emissive: 0x002200
                });
                const plant = new THREE.Mesh(plantGeometry, plantMaterial);
                plant.position.set(j, i * 0.8 + 0.25, 0);
                plant.castShadow = true;
                group.add(plant);
            }
        }

        // 지지 구조 - 밝은 회색
        const pipeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3);
        const pipeMaterial = new THREE.MeshPhongMaterial({
            color: 0xC0C0C0,
            shininess: 100
        });

        for (let i = 0; i < 4; i++) {
            const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
            pipe.position.set(-2 + i * 1.3, 1, 0.6);
            group.add(pipe);
        }

        group.position.y = -1;
        scene.add(group);
    };

    return (
        <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {!isModelLoaded && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '20px',
                    borderRadius: '10px',
                    color: 'white',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ marginBottom: '10px' }}></div>
                    <div>{loadingStatus}</div>
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '15px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9em',
                backdropFilter: 'blur(10px)'
            }}>
                <div>️ 마우스: 회전/줌</div>
                <div> LED 성장등 시뮬레이션</div>
                {hasError && <div>⚠️ 기본 모델 표시 중</div>}
            </div>
        </div>
    );
};

export default PureThreeViewer;