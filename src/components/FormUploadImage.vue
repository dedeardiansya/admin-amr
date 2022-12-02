<template>
  <div>
    <h4>PICK IMAGE AND UPLOAD TO GALLERY</h4>
    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
    <b-form-file
      v-model="file"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    />
    <b-button variant="primary" @click="upload" :disabled="loading"
      >UPLOAD</b-button
    >
  </div>
</template>
<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../firebase";
export default {
  data() {
    return {
      loading: false,
      error: "",
      file: null,
    };
  },
  methods: {
    async upload() {
      this.loading = true;
      this.error = "";
      try {
        const canvas = await this.crop(URL.createObjectURL(this.file), 1);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        const storage = getStorage();
        const fullname = "gallery/" + Date.now() + this.file.name;
        const storageRef = ref(storage, fullname);
        await uploadBytes(storageRef, blob);
        this.file = null;
        this.$emit("uploaded", {
          url: `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${fullname}`,
          fullname,
        });
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
    crop(url, aspectRatio) {
      return new Promise((resolve) => {
        const inputImage = new Image();
        inputImage.crossOrigin = "anonymous";
        inputImage.onload = () => {
          // let's store the width and height of our image
          const inputWidth = inputImage.naturalWidth;
          const inputHeight = inputImage.naturalHeight;

          // get the aspect ratio of the input image
          const inputImageAspectRatio = inputWidth / inputHeight;

          // if it's bigger than our target aspect ratio
          let outputWidth = inputWidth;
          let outputHeight = inputHeight;
          if (inputImageAspectRatio > aspectRatio) {
            outputWidth = inputHeight * aspectRatio;
          } else if (inputImageAspectRatio < aspectRatio) {
            outputHeight = inputWidth / aspectRatio;
          }

          // calculate the position to draw the image at
          const outputX = (outputWidth - inputWidth) * 0.5;
          const outputY = (outputHeight - inputHeight) * 0.5;

          // create a canvas that will present the output image
          const outputImage = document.createElement("canvas");

          // set it to the same size as the image
          outputImage.width = outputWidth;
          outputImage.height = outputHeight;

          // draw our image at position 0, 0 on the canvas
          const ctx = outputImage.getContext("2d");
          ctx.drawImage(inputImage, outputX, outputY);
          resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
      });
    },
  },
};
</script>
