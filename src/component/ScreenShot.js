import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";
import SignatureScreen from "react-native-signature-canvas";

const ScreenShot = () => {
  const imageRef = useRef();
  const ref = useRef();
  const [captureSignature, setCaptureSignature] = useState(null);

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert("Screenshot captured");
        setCaptureSignature(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOK = (signature) => {
    setCaptureSignature(signature);
    console.log("handle ok");
    // console.log(signature);
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  const handleData = (data) => {
    console.log({ data });
  };

  useEffect(() => {
    setTimeout(() => {
      if (captureSignature != null) {
        onSaveImageAsync();
      }
    }, 500);
  }, [captureSignature]);

  return (
    <View
      ref={imageRef}
      collapsable={false}
      style={{ width: "100%", height: 500, backgroundColor: "#fff" }}
    >
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onGetData={handleData}
        autoClear={true}
      />
      {captureSignature && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 330,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: captureSignature }}
            tintColor={"black"}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
    </View>
  );
};

export default ScreenShot;

const styles = StyleSheet.create({});
