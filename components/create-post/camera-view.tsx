import { useCameraPermissions } from 'expo-image-picker';
import RequestCameraPermission from './request-permission';
import React from 'react';
import { CameraView } from 'expo-camera';
import { ActivityIndicator, View } from 'react-native';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from '../ui/text';
import {
  FlashSlash,
  Gallery,
  Profile2User,
  RotateLeft,
  Timer1,
  Watch,
} from 'iconsax-react-native';
import { X } from 'lucide-react-native';

interface CameraWrapperProps {
  onCapture: (photo: string) => void;
  onClose: () => void;
}
export default function CameraWrapper({ onCapture, onClose }: CameraWrapperProps) {
  const cameraOptions = [
    { icon: RotateLeft, action: handleToggleCamera },
    { icon: FlashSlash, action: handleToggleFlash },
    { icon: Timer1, action: () => {} },
    { icon: Profile2User, action: handleToggleFlash },
    { icon: Gallery, action: handleToggleFlash },
  ];
  const [permission, _] = useCameraPermissions();
  const [cameraReady, setCameraReady] = React.useState(false);
  const [mode, setMode] = React.useState<'photo' | 'video'>('photo');
  const [facing, setFacing] = React.useState<'front' | 'back'>('back');
  const [flash, setFlash] = React.useState<'on' | 'off' | 'auto'>('off');
  const cameraRef = React.useRef<CameraView>(null);
  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={32} color="gray" />
      </View>
    );
  }

  if (!permission?.granted) {
    return <RequestCameraPermission />;
  }
  function handleTakePhoto() {
    if (!cameraRef.current) return;
    cameraRef.current.takePictureAsync().then((photo) => {
      onCapture(photo.uri);
    });
  }
  function handleToggleCamera() {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  }
  function handleToggleFlash() {
    setFlash((prev) => (prev === 'off' ? 'on' : prev === 'on' ? 'auto' : 'off'));
  }
  return (
    <View className="z-10 flex-1" style={StyleSheet.absoluteFill}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onCameraReady={() => setTimeout(() => setCameraReady(true), 500)}
        ref={cameraRef}
        facing={facing}
        mirror
      />
      {/* Camera Options */}
      <Pressable className="absolute left-5 top-5" onPress={onClose}>
        <X size={30} color="white" strokeWidth={2} />
      </Pressable>
      <View className="absolute right-5 top-5  items-center gap-5">
        {cameraOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Pressable key={index} onPress={option.action}>
              <Icon size={25} variant="Bold" color="white" strokeWidth={2} />
            </Pressable>
          );
        })}
      </View>
      {cameraReady && (
        <View className=" absolute bottom-24 w-full flex-row items-center justify-center ">
          <Pressable
            onPress={handleTakePhoto}
            className=" size-20 self-center rounded-full border-[6px] border-white bg-transparent"
          />
        </View>
      )}
    </View>
  );
}
