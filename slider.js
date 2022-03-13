class slider{
    slideIndex = 1;

    constructor(options){
        this.options = options;
        this.initialStuff();

        this.creatNextAndPrevBtns();
        this.creatDots();

        this.showSlide(1);

        this.setinterval()
        
        
    }

    initialStuff(){
        let {el : sliderElement , slideClass , auto } = this.options;

        if(! sliderElement) throw Error ('is not found element');
       
        if(! Number.isInteger(auto)) this.auto = 0;
        else this.auto = auto;

        this.sliders = [...sliderElement.children].filter(elm => elm.classList.contains(slideClass))
    
        
    }

    creatNextAndPrevBtns(){
        let {el : sliderElement  , slideClass} = this.options;
        
        sliderElement.insertAdjacentHTML('beforeEnd' , `
        
        <a class="next"><i class="material-icons-outlined">></i></a>
        <a class="prev"><i class="material-icons-outlined"><</i></a>
        
        `);
        sliderElement.querySelector('.next').addEventListener('click' , () => {
            
            this.incrementSlide()
            
        })
        sliderElement.querySelector('.prev').addEventListener('click' , () => {
            this.decrementSlide()
        })

       
         
    }

    incrementSlide = () => {
        this.resetinterval()
        this.showSlide(this.slideIndex += 1)

    }
    

    decrementSlide = () => {
        this.resetinterval()
        this.showSlide(this.slideIndex -= 1);
    }
    
    currentSlider = n => this.showSlide(this.slideIndex = n);
    
    creatDots(){
            let { el : sliderElement} = this.options;

            let dotElement = [...this.sliders].map((slider , index) => `<span class="dot" data-slide="${index+1}"></span>`);
            let dots = document.createElement('div');
            dots.classList.add('dots');
            dots.innerHTML = `${dotElement.join('')}`;
            
            sliderElement.after(dots)
            
            this.dots = dots.querySelectorAll('.dot');
            this.dots.forEach(dot => dot.addEventListener('click' , e => this.currentSlider(parseInt(e.target.dataset.slide))))
            
    }
    showSlide(number){

        let {el : sliderElement , slideClass ,currentSlide} = this.options;
        
       if (number > this.sliders.length) {
           this.slideIndex = 1;
       }
       if (number < 1) {
           this.slideIndex = this.sliders.length;
       }
        
       
      
       sliderElement.querySelector(`.${slideClass}.active`).classList.remove('active');
       this.dots.forEach(dot => dot.classList.remove('active'));
       this.sliders[this.slideIndex-1].classList.add('active')
       this.dots[this.slideIndex-1].classList.add('active')

       if(currentSlide) currentSlide(this.sliders[this.slideIndex-1])

    }
    setinterval(){
           
           this.intervalID = setInterval(() => this.showSlide(this.slideIndex += 1), this.auto);
    }
    resetinterval(){
        
        clearInterval(this.intervalID)
        this.setinterval()
    }
  
}