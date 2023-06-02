/* 총알 정의하기 */
class Bullet extends GameObject {
    //총알이 한 발자국씩 앞으로 전진할 때마다, 게임에 남아있는 적군들에 대해 충돌 체크를 해본다.
    //충돌이라면, 총알과 적군 모두 화면에서 사라지기.
    //화면에서 사라진다는 것은 -> 배열 명단에서도 제거해야 한다는 뜻.
    //원래라면, 부모님 것을 그냥 써도 되지만, 부모가 물려준 tick()에는 충돌체크 로직이 없으므로, 
    //부모 것을 업그레이드 할 필요가 있다. 이러한 메서드 정의 기법을 op에서는 오버라이딩(Overriding)이라 한다.
   
    render(){ //그 변화된 값을 이용하여 화면에 그래픽 처리
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.hitTest();
        
        if(this.x>950){
            //총알이 if문을 만나지 않았다는 것은 적군과 충돌하지 않은 총알이라는 것.
            //이때 그 총안은 화면 밖으로 나갔는지 여부를 따져보고 충돌을 거치지 않은 총알은 메모리 누수를 방지하기 위해 제거한다.
            this.container.removeChild(this.img);
            let myIndex = bulletArray.indexOf(this);
            bulletArray.splice(myIndex, 1);
        }
    }

    hitTest() {
        //충돌 체크
        for (let i = 0; i < enemyArray.length; i++) {
            let result = collisionCheck(this, enemyArray[i]);

            if (result) { //충돌했다면,
                //console.log(i, " 번째 적군과 충돌함");

                //화면에서 제거하기
                //총알 제거(me)
                this.container.removeChild(this.img); //제거 대상은 인스턴스인 this. 자체가 아니라 그래픽적으로 this가 가진 img.

                //총알이 소속된 배열에서도 제거.
                //총알이 들어있는 배열에서 현재 '내'가(총알) 몇번째 인덱스에 들어있는지 조사
                let myIndex = bulletArray.indexOf(this);
                bulletArray.splice(myIndex, 1);

                //적군 제거(you)
                this.container.removeChild(enemyArray[i].img);
                //충돌된 적군이 적군 배열에서 몇 번째에 들어있는지 조사
                let youIndex = enemyArray.indexOf(enemyArray[i]);
                enemyArray.splice(youIndex, 1);

                //점수 올리기
                setScore();

                break; //충돌했늕지 콜리젼 체크 멈춰야 함.

            }
        }
    }
}

