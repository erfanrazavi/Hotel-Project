

document.addEventListener('DOMContentLoaded' , function(e) {
    let preloader = document.getElementById('preloader')
    let site = document.querySelector('.hotel-site')
        
    preloader.style.display = 'none';
    site.style.display = 'flex';

   let backToTop = document.querySelector('#backToTop')
    backToTop.addEventListener('click' , function(e){
        scrollTop( 0 , 1000)
    })


    function scrollTop(scroll , duration){
        
        let currentTime = duration;
        let doc = document.documentElement;
        let speed = 5;
        
        let animate = () => {
            if(currentTime <= 0) return;
            
            setTimeout(() => {
                currentTime -= speed;
                
                doc.scrollTop -= doc.scrollTop / (currentTime / speed)
                animate()
            }, speed);
        }

        animate()
    }

   window.addEventListener('scroll' , function(e) {
       console.log(e)
       if(document.documentElement.scrollTop > 250){
           backToTop.style.display = 'flex';
       }else{
           backToTop.style.display = 'none';
       }
   })
});