import { useCameraPermissions } from 'expo-camera';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Text } from '../ui/text';
import {Pressable, View } from 'react-native';
import { CameraOff } from 'lucide-react-native';

export default function RequestCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();
  function handleRequestPermission() {
    requestPermission();
    console.log('Requesting permission...');
  }
  return (
    <Dialog open={!permission?.granted}>
      <DialogContent className='bg-white border-0 items-center rounded-xl'>
        <DialogHeader className='items-center '>
         <View className='bg-gray-100 p-4 rounded-full mb-4'>
           <CameraOff/>
         </View>
          <DialogTitle className='text-xl '>Camera permission required</DialogTitle>
          <DialogDescription className='text-base text-gray-500'>We need access to your camera to take photos.</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row mt-5 items-center justify-center gap-2'>
          <DialogClose className='bg-gray-100 p-3 px-4 w-1/3 rounded-xl'>
            <Text className='text-center'>Close</Text>
          </DialogClose>
          <Pressable  onPress={handleRequestPermission} className='w-1/2 bg-blue-500 p-3 px-4 rounded-xl'>
            <Text className='text-white text-center'>Allow Permission</Text>
          </Pressable>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
