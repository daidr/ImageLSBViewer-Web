$(function () {
    const mainReader = new FileReader();
    const selectedImage = new Image();
    let couldUseHotKeys = false;
    const functionsList = {
        original: function () {
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        color_inverse: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                pixelArray.data[i] = pixelArray.data[i] ^ 255;
                pixelArray.data[i + 1] = pixelArray.data[i + 1] ^ 255;
                pixelArray.data[i + 2] = pixelArray.data[i + 2] ^ 255;
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        random_color_map: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            let bm = Math.randomInt(1, 255), ba = Math.randomInt(1, 255), bx = Math.randomInt(1, 255);
            let gm = Math.randomInt(1, 255), ga = Math.randomInt(1, 255), gx = Math.randomInt(1, 255);
            let rm = Math.randomInt(1, 255), ra = Math.randomInt(1, 255), rx = Math.randomInt(1, 255);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                let r = pixelArray.data[i], g = pixelArray.data[i + 1], b = pixelArray.data[i + 2], col = 0;
                b = ((b * bm * bm) ^ bx) + ba;
                g = ((g * gm * gm) ^ gx) + ga;
                r = ((r * rm * rm) ^ rx) + ra;
                col = (r << 16) + (g << 8) + b + ((pixelArray.data[i + 3] & 0xff) << 24);
                pixelArray.data[i] = (col & 0xff0000) >> 16;
                pixelArray.data[i + 1] = (col & 0xff00) >> 8;
                pixelArray.data[i + 2] = col & 0xff;
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        full_rgb: function (keep) {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = keep; i < pixelArray.data.length; i = i + 4) {
                if (keep) pixelArray.data[i - keep] = 0;
                if (keep - 1) pixelArray.data[i - keep + 1] = 0;
                if (keep - 2) pixelArray.data[i - keep + 2] = 0;
                pixelArray.data[i - keep + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
        full_alpha: function () {
            let pixelArray = getAllPixel(offContext, selectedImage.width, selectedImage.height);
            for (let i = 0; i < pixelArray.data.length; i = i + 4) {
                pixelArray.data[i] = pixelArray.data[i + 3];
                pixelArray.data[i + 1] = 0;
                pixelArray.data[i + 2] = 0;
                pixelArray.data[i + 3] = 255;
            }
            offContext.putImageData(pixelArray, 0, 0);
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
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
            //$(".finalImage").attr("src", offCanvas.toDataURL("image/png"));
        },
    }
    const modesList = [
        {
            name: "original",
            showText: "原图",
            function: function () {
                functionsList.original()
            }
        },
        {
            name: "color_inverse",
            showText: "反色",
            function: function () {
                functionsList.color_inverse()
            }
        },
        {
            name: "gray_bits",
            showText: "Gray Bits",
            function: function () {
                functionsList.gray_bits()
            }
        },
        {
            name: "random_color_map",
            showText: "Random Color Map 1",
            function: function () {
                functionsList.random_color_map()
            }
        },
        {
            name: "random_color_map",
            showText: "Random Color Map 2",
            function: function () {
                functionsList.random_color_map()
            }
        },
        {
            name: "full_red",
            showText: "Full Red",
            function: function () {
                functionsList.full_rgb(0)
            }
        },
        {
            name: "full_green",
            showText: "Full Green",
            function: function () {
                functionsList.full_rgb(1)
            }
        },
        {
            name: "full blue",
            showText: "Full Blue",
            function: function () {
                functionsList.full_rgb(2)
            }
        },
        {
            name: "full_alpha",
            showText: "Full Alpha",
            function: function () {
                functionsList.full_alpha()
            }
        },
        {
            name: "red_plane_0",
            showText: "Red Plane 0",
            function: function () {
                functionsList.red_plane_0()
            }
        },
        {
            name: "green_plane_0",
            showText: "Green Plane 0",
            function: function () {
                functionsList.green_plane_0()
            }
        },
        {
            name: "blue_plane_0",
            showText: "Blue Plane 0",
            function: function () {
                functionsList.blue_plane_0()
            }
        },
        {
            name: "alpha_plane_0",
            showText: "Alpha Plane 0",
            function: function () {
                functionsList.alpha_plane_0()
            }
        },
        {
            name: "red_plane_1",
            showText: "Red Plane 1",
            function: function () {
                functionsList.red_plane_1()
            }
        },
        {
            name: "green_plane_1",
            showText: "Green Plane 1",
            function: function () {
                functionsList.green_plane_1()
            }
        },
        {
            name: "blue_plane_1",
            showText: "Blue Plane 1",
            function: function () {
                functionsList.blue_plane_1()
            }
        },
        {
            name: "alpha_plane_1",
            showText: "Alpha Plane 1",
            function: function () {
                functionsList.alpha_plane_1()
            }
        },
        {
            name: "red_plane_2",
            showText: "Red Plane 2",
            function: function () {
                functionsList.red_plane_2()
            }
        },
        {
            name: "green_plane_2",
            showText: "Green Plane 2",
            function: function () {
                functionsList.green_plane_2()
            }
        },
        {
            name: "blue_plane_2",
            showText: "Blue Plane 2",
            function: function () {
                functionsList.blue_plane_2()
            }
        },
        {
            name: "alpha_plane_2",
            showText: "Alpha Plane 2",
            function: function () {
                functionsList.alpha_plane_2()
            }
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
    offCanvas.className = "finalImage";
    let offContext = offCanvas.getContext('2d');
    document.getElementsByClassName('handle-container')[0].appendChild(offCanvas);
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
    $(document).keydown(function (event) {
        if (couldUseHotKeys) {
            if (event.keyCode == 37) {
                $(".switchLeft").click();
            } else if (event.keyCode == 39) {
                $(".switchRight").click();
            }
        }
    });
    mainReader.onload = function (e) {
        selectedImage.src = e.target.result;
        //$(".finalImage").attr("src", e.target.result);
        $(".handle-container").show();
    }
    selectedImage.onload = function () {
        modesListOperations.currentMode();
        couldUseHotKeys = true;
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
        offContext.drawImage(selectedImage, 0, 0);
    }

    // 随机整数
    Math.randomInt = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
})

