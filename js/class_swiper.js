class Swiper {
  constructor(props){
    this.state ={
      swiperContainer:props.swiperContainer, //容器的id
      activePlay:0,//轮播图当前页
      imgNumber:props.urlArr.length,//图片数
      settimeId:null,//定时器id
      imgArr:props.urlArr,
    };
    //console.log(this.state.swiperContainer);
    console.log(this.state.imgArr);
    //静态方法
    //用于选择DOM
    this._$ = selector =>document.querySelector(selector);
    //this._$ = selector=>document.querySelectorAll(selector)[0];
    //用于创建DOM
    this._createElement = type => document.createElement(type);
    //用于文本赋值
    this._setContent =(elem,content)=>elem.textContent = content;
    //用于增加子节点
    this._appendChild =(container,node)=>container.appendChild(node);
    //启动流程
    this._init();
  }
  // 创建DOM
  _init(){
    this._addHTML();
  }
  _addHTML(){
    let $ = this._$;
    let idContainer = $(`#${this.state.swiperContainer}`);
    //console.log(idContainer);
    let  imgData = this.state.imgArr;
    //console.log(imgData);
    let imgDataLength =this.state.imgNumber;
    console.log(imgDataLength);
    let swiperList = this._createElement('div');
    swiperList.setAttribute('id','swiper-list');
    swiperList.style.width = this.state.imgNumber + "00%";
    swiperList.style.left = "0";
    this._appendChild(idContainer,swiperList);
    //console.log(swiperList);
    let swiperItem = this._createElement('div');
    swiperItem.setAttribute('class','swiper-item');
    //console.log(swiperItem);
    //this._appendChild(swiperList,swiperItem);
    let swiperArrowOne = this._createElement('span');
    swiperArrowOne.setAttribute('id','swiper_pre');
    swiperArrowOne.setAttribute('class','arrow-left');
    this._appendChild(idContainer,swiperArrowOne);
    //console.log(swiperArrowOne);
    let swiperArrowTwo = this._createElement('span');
    swiperArrowTwo.setAttribute('id','swiper_nex');
    swiperArrowTwo.setAttribute('class','arrow-right');
    this._appendChild(idContainer,swiperArrowTwo);
    let idpagination = this._createElement('ul');
    idpagination.setAttribute('id','paginationId');
    this._appendChild(idContainer,idpagination);
    for(let value of imgData){//创建圆点
      let swiperItem = this._createElement('div');
      swiperItem.setAttribute('class','swiper-item');
      swiperItem.style.width = 100 / this.state.imgNumber +"%";
      let itemImg = this._createElement('img');
      itemImg.setAttribute("src",`${value}`);
      console.log(itemImg);
      this._appendChild(swiperItem,itemImg);
      console.log(swiperItem);
      this._appendChild(swiperList,swiperItem);
      let pagintionItem = this._createElement('li');
      pagintionItem.setAttribute('class','pagintion-item');

      // if(this.state.activePlay){
      //   pagintionItem.setAttribute('id','pagination_active');
      // }else{
      //   pagintionItem.setAttribute('id','');
      // }
      
      console.log(pagintionItem);
      this._appendChild(idpagination,pagintionItem); 
      //console.log(idpagination);
    }
    document.getElementsByClassName('pagintion-item')[this.state.activePlay].id = "pagination_active";


    //绑定事件
    swiperArrowOne.addEventListener('click',this._leftAngleclick.bind(this));
    swiperArrowTwo.addEventListener('click',this._rightAngleclick.bind(this));

    let pageU1 = document.getElementById("paginationId");
    let pages = pageU1.getElementsByClassName("pagintion-item");
    for(let key=0;key<pages.length;key++){
      pages[key].addEventListener("click",this._selectPage.bind(this,key));
    }

    idContainer.addEventListener('mouseleave',this.setTime.bind(this));
    idContainer.addEventListener('mouseenter',this.clearTime.bind(this));
    
    

    this._pageActiveColor();
    //this._setTime();

  }
  _pageActiveColor(){//绘制圆点
    document.getElementById("pagination_active").id = "";
    // swiperItem.setAttribute('id','pagination_active');
    document.getElementsByClassName("pagintion-item")[this.state.activePlay].id = "pagination_active";
  }
  _rightAngleclick(){//点击左箭头
    let swiperListContainer = document.getElementById('swiper-list');
    if(this.state.activePlay == 0){
      this.state.activePlay = this.state.imgNumber -1;
    }else{
      this.state.activePlay--;
    }
    swiperListContainer.style.left ="-"+this.state.activePlay +"00%";
    this._pageActiveColor();
  }
  _leftAngleclick(){
    let swiperListContainer = document.getElementById('swiper-list');
    if(this.state.activePlay == this.state.imgNumber -1){
      this.state.activePlay = 0;
    }else{
      this.state.activePlay ++;
    }
    swiperListContainer.style.left ="-"+this.state.activePlay +"00%";
    this._pageActiveColor();
  }
  _selectPage(index){//点击圆点定位到指定图片
    this.state.activePlay = index;
    //console.log(index);
    let swiperListContainer = document.getElementById('swiper-list');
    swiperListContainer.style.left ="-" + this.state.activePlay +"00%";
    this._pageActiveColor();
  }
  setTime(){ //自动播放
    let wripId =this.state.swiperContainer;
    this.state.settimeId = setInterval(()=>{
      this._rightAngleclick()
    },3000)
  }
  clearTime(){
    clearInterval(this.state.settimeId);
  }
}