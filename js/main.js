$(function () {
    const mainReader = new FileReader();
    const selectedImage = new Image();
    const functionsList = {
        original: function () {
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        color_inverse: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                pixelArray.data[i] = 255 - pixelArray.data[i];
                pixelArray.data[i + 1] = 255 - pixelArray.data[i + 1];
                pixelArray.data[i + 2] = 255 - pixelArray.data[i + 2];
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        gray_bits: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] == pixelArray.data[i + 1] && pixelArray.data[i] == pixelArray.data[i + 2]) {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 255
                } else {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 0
                }
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        red_plane: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                //pixelArray.data[i] = 0;
                pixelArray.data[i + 1] = 0;
                pixelArray.data[i + 2] = 0;
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        green_plane: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 1; i < pixelArray.data.length; i = i + 4) {
                //pixelArray.data[i] = 0;
                pixelArray.data[i - 1] = 0;
                pixelArray.data[i + 1] = 0;
                pixelArray.data[i + 2] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        blue_plane: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 2; i < pixelArray.data.length; i = i + 4) {
                //pixelArray.data[i] = 0;
                pixelArray.data[i - 2] = 0;
                pixelArray.data[i - 1] = 0;
                pixelArray.data[i + 1] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        alpha_plane: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 3; i < pixelArray.data.length; i = i + 4) {
                //pixelArray.data[i] = 255;
                pixelArray.data[i - 3] = pixelArray.data[i];
                pixelArray.data[i - 2] = 0;
                pixelArray.data[i - 1] = 0;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        red_plane_0: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 2 == 0) {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 0;
                } else {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 255;
                }
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        green_plane_0: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 1; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 2 == 0) {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 0;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 255;

                }
                pixelArray.data[i + 2] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        blue_plane_0: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 2; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 2 == 0) {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                }
                pixelArray.data[i + 1] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        alpha_plane_0: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 3; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 2 == 0) {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                } else {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                }
                pixelArray.data[i] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        red_plane_1: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 4 - pixelArray.data[i] % 2 == 2) {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 0;
                }
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        green_plane_1: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 1; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 4 - pixelArray.data[i] % 2 == 2) {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 0;
                }
                pixelArray.data[i + 2] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        blue_plane_1: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 2; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 4 - pixelArray.data[i] % 2 == 2) {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                }
                pixelArray.data[i + 1] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        alpha_plane_1: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 3; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 4 - pixelArray.data[i] % 2 == 2) {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                } else {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                }
                pixelArray.data[i] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        red_plane_2: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 8 - pixelArray.data[i] % 4 == 4) {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i + 1] = pixelArray.data[i + 2] = 0;
                }
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        green_plane_2: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 1; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 8 - pixelArray.data[i] % 4 == 4) {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 1] = pixelArray.data[i + 1] = 0;
                }
                pixelArray.data[i + 2] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        blue_plane_2: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);

            for (let i = 2; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 8 - pixelArray.data[i] % 4 == 4) {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                } else {
                    pixelArray.data[i] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                }
                pixelArray.data[i + 1] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        alpha_plane_2: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 3; i < pixelArray.data.length; i = i + 4) {
                if (pixelArray.data[i] % 8 - pixelArray.data[i] % 4 == 4) {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 255;
                } else {
                    pixelArray.data[i - 3] = pixelArray.data[i - 2] = pixelArray.data[i - 1] = 0;
                }
                pixelArray.data[i] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            $(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
    }
    const modesList = [
        {
            name: "original",
            showText: "原图",
            function: functionsList.original
        },
        {
            name: "color_inverse",
            showText: "反色",
            function: functionsList.color_inverse
        },
        {
            name: "gray_bits",
            showText: "Gray Bits",
            function: functionsList.gray_bits
        },
        {
            name: "red_plane",
            showText: "Red Plane",
            function: functionsList.red_plane
        },
        {
            name: "green_plane",
            showText: "Green Plane",
            function: functionsList.green_plane
        },
        {
            name: "blue_plane",
            showText: "Blue Plane",
            function: functionsList.blue_plane
        },
        {
            name: "alpha_plane",
            showText: "Alpha Plane",
            function: functionsList.alpha_plane
        },
        {
            name: "red_plane_0",
            showText: "Red Plane 0",
            function: functionsList.red_plane_0
        },
        {
            name: "green_plane_0",
            showText: "Green Plane 0",
            function: functionsList.green_plane_0
        },
        {
            name: "blue_plane_0",
            showText: "Blue Plane 0",
            function: functionsList.blue_plane_0
        },
        {
            name: "alpha_plane_0",
            showText: "Alpha Plane 0",
            function: functionsList.alpha_plane_0
        },
        {
            name: "red_plane_1",
            showText: "Red Plane 1",
            function: functionsList.red_plane_1
        },
        {
            name: "green_plane_1",
            showText: "Green Plane 1",
            function: functionsList.green_plane_1
        },
        {
            name: "blue_plane_1",
            showText: "Blue Plane 1",
            function: functionsList.blue_plane_1
        },
        {
            name: "alpha_plane_1",
            showText: "Alpha Plane 1",
            function: functionsList.alpha_plane_1
        },
        {
            name: "red_plane_2",
            showText: "Red Plane 2",
            function: functionsList.red_plane_2
        },
        {
            name: "green_plane_2",
            showText: "Green Plane 2",
            function: functionsList.green_plane_2
        },
        {
            name: "blue_plane_2",
            showText: "Blue Plane 2",
            function: functionsList.blue_plane_2
        },
        {
            name: "alpha_plane_2",
            showText: "Alpha Plane 2",
            function: functionsList.alpha_plane_2
        },
    ]
    const modesListOperations = {
        currentModeIndex: 0,
        nextMode: function () {
            drawOffCanvas();

            if (this.currentModeIndex == modesList.length - 1) {
                this.currentModeIndex = 0;
                changeLabelCaption(modesList[this.currentModeIndex].showText);
                modesList[this.currentModeIndex].function();
            } else {
                this.currentModeIndex++;
                changeLabelCaption(modesList[this.currentModeIndex].showText);
                modesList[this.currentModeIndex].function();
            }
        },
        previousMode: function () {
            drawOffCanvas();
            if (this.currentModeIndex == 0) {
                this.currentModeIndex = modesList.length - 1;
                changeLabelCaption(modesList[this.currentModeIndex].showText);
                modesList[this.currentModeIndex].function();
            } else {
                this.currentModeIndex--;
                changeLabelCaption(modesList[this.currentModeIndex].showText);
                modesList[this.currentModeIndex].function();
            }
        },
        currentMode: function () {
            drawOffCanvas();
            changeLabelCaption(modesList[this.currentModeIndex].showText);
            modesList[this.currentModeIndex].function();
        },
        resetMode: function () {
            this.currentModeIndex = 0;
            drawOffCanvas();
            changeLabelCaption(modesList[this.currentModeIndex].showText);
            modesList[this.currentModeIndex].function();
        }
    }
    let offCanvas = document.createElement('canvas');
    let offContext = offCanvas.getContext('2d');
    $(".selectImageButton").click(function () {
        $(".imgFileSelector").val("");
        $(".imgFileSelector").click();
    });
    $(".switchLeft").click(function () {
        modesListOperations.previousMode();
    });
    $(".switchRight").click(function () {
        modesListOperations.nextMode();
    });
    $(".imgFileSelector").change(function (e) {
        mainReader.readAsDataURL(e.target.files[0]);
    });
    mainReader.onload = function (e) {
        selectedImage.src = e.target.result;
        $(".finalImage").attr("src", e.target.result);
        $(".handle-container").show();
    }
    selectedImage.onload = function () {
        modesListOperations.currentMode();
        $(document).keydown(function (event) {
            if (event.keyCode == 37) {
                $(".switchLeft").click()
            } else if (event.keyCode == 39) {
                $(".switchRight").click()
            }
        });
    }
    function changeLabelCaption(content) {
        $(".currentModeShowLabel").text(`模式：${content}`);
    }

    function getAllPixel(context, width, height) {
        return context.getImageData(0, 0, width, height);
    }

    function drawOffCanvas() {
        offCanvas.width = selectedImage.width;
        offCanvas.height = selectedImage.height;
        offContext.clearRect(0, 0, selectedImage.width, selectedImage.height);
        offContext.drawImage(selectedImage, 0, 0, selectedImage.width, selectedImage.height);
    }

    // 重写了随机数函数
    Math.random = function (seed) {
        return ('0.' + Math.sin(seed).toString().substr(6));
    }

    // 随机整数
    Math.randomInt = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
})

