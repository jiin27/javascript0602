/*
다이어리에 사용되는 모든 박스의 정의 규정
*/
class Box{
    constructor(container, width, height, x, y, text, line, bg){
        this.container=container;
        this.div;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.text=text;
        this.line=line; //테두리 색깔
        this.bg=bg;

        //박스 생성 및 스타일 적용
        this.div=document.createElement("div");
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.border="1px solid "+this.line;
        this.div.style.boxSizing="border-box";

        this.div.style.position="absolute";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";

        this.div.style.background=this.bg;

        //텍스트 대입
        this.div.innerText=this.text;

        this.container.appendChild(this.div); //디자인적으로 포함관계의 child 의미!! 부모-자식 간의 관계가 아님.
    }

    //태어난 후 text를 변경할 일이 있다면, 아래의 메서드로 처리한다.
    setText(text){
        this.text=text;
        this.div.innerText=this.text;  //텍스트 대입
    }
}