import profile_1 from "../assets/img/profile_1.png";
import profile_2 from "../assets/img/profile_2.png";
import profile_3 from "../assets/img/profile_3.png";
import profile_4 from "../assets/img/profile_4.png";


  const Menu = 
  {   
    menu: [
    { id:1,name: '내 프로필',link:'/Mypage/profile'},
    { id:2, name: '모집 현황',link:'/Mypage/board' },
    { id:3,name: '지원 현황',link:'/Mypage/apply'},
    { id:4,name: '신고 현황',link:'/Mypage/report'},
    { id:5,name: '북마크 현황',link:'/Mypage/bookmark'},
  ],
  }

  const profileProgress = 
  {   
    progress: [
    { id:1,name: '프로필 등록',img:profile_1},
    { id:2, name:'모집글 검토',img:profile_2 },
    { id:3,name: '프로필 지원',img:profile_3},
    { id:4,name: '계약 완료',img:profile_4},
  ],
  }





  export {Menu,profileProgress}; 