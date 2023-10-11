import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import ViewShot from "react-native-view-shot";
import axios from "axios";

function DrawScreen() {
  const [capturedImage, setCapturedImage] = useState(null);
  const viewShotRef = React.createRef();

  const handleCaptureImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      const formData = new FormData();
      formData.append("my-image-file", {
        uri: uri,
        type: "image/png",
        name: "captured_image.png",
      });

  
      try {
        const uploadResponse = await axios.post(
          'http://192.168.1.102:3001/image-upload', 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (uploadResponse.status === 200) {
          console.log('Image uploaded successfully.');
        } else {
          console.error('Image upload failed.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

   
      setCapturedImage(uri);
    } catch (error) {
      console.error("Error capturing image: ", error);
    }
  };

  return (
    <View>
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
        <View style={{ backgroundColor: "white" }}>
          <Text>WOHOOOO</Text>
        </View>
      </ViewShot>
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={{ flex: 1 }} resizeMode="contain" />
      )}
      <Button title="Capture Image" onPress={handleCaptureImage} />
    </View>
  );
}

export default DrawScreen;
