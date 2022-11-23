const imgUpload = document.querySelector('.file-input'),
imgBtn = document.querySelector('.choose-img'),
previewImg = document.querySelector(".preview-img img"),
rotateOption = document.querySelectorAll(".rotate button"),
filterOption = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterSlider = document.querySelector(".slider input"),
saveImageBtn = document.querySelector(".save-img"),
filterResetBtn = document.querySelector(".reset-filter"),
filterValue = document.querySelector(".filter-info .value");



let brightness = 100, saturation = 100, inversion = 0, grayscale = 0
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


const loadImage = ()=>{
    let file = imgUpload.files[0]
    if(!file) return;
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener('load', ()=>{
        document.querySelector('.container').classList.remove('.disable')
   })
    
}

filterOption.forEach(option => {
    option.addEventListener('click', ()=>{
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterName.innerText = option.innerText 
        if(option.id === "brightness"){
            filterSlider.max = "200"
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}` 
        }else if(option.id === "saturation"){
            filterSlider.max = "200"
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}`
        }else if(option.id === "inversion"){
            filterSlider.max = "100"
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}`
        }else {
            filterSlider.max = "100"
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}`
        }


    })
    
});

const updateFilter = ()=>{
    filterValue.innerText = `${filterSlider.value}`
    const selctedFilter = document.querySelector(".filter .active")
    if(selctedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selctedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selctedFilter.id === "inversion"){
        inversion = filterSlider.value
    
    }else{
        grayscale = filterSlider.value
    }
    applyFilter()   
}

rotateOption.forEach(option=>{
    option.addEventListener('click', ()=>{
        if(option.id === "left"){
            rotate -= 90
        }else if(option.id === "right"){
            rotate += 90
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        
        }else {
            flipVertical = flipVertical === 1
        }

        applyFilter()
    })
})

const resetFilter = ()=>{
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOption[0].click()
    applyFilter();
    

}

const saveImage= () =>{
    const canvas = document.createElement("canvas")
    const ctx  = canvas.getContext("2d")
    canvas.width = previewImg.naturalWidth
    canvas.width = previewImg.naturalHeight
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)` 
    ctx.drawImage(previewImg, 0 ,0, canvas.width,canvas.width)
    document.body.appendChild(canvas)

}

filterSlider.addEventListener('input', updateFilter);
saveImageBtn.addEventListener('click', saveImage )
filterResetBtn.addEventListener('click',resetFilter)
imgUpload.addEventListener('change', loadImage)
imgBtn.addEventListener('click', ()=>imgUpload.click())
