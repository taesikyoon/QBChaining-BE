# QBChaining(큐브체이닝)

![image](https://user-images.githubusercontent.com/107670953/192535804-96eddfd1-0fda-4a4f-8aaf-e68210e2fde1.png)

사이트 주소 <https://www.qb-chaning.com/>

## 기획의도

개발프로그램 특성상 영어로된 질문과 답변들이 많은데, 영어라는 언어의 장벽과, 프로그래밍 언어라는 두개의 장벽을 한번에 깨보고자 개발자 커뮤니티를 만들고자 했습니다.

## 팀소개

- REACT, NODE.JS
- 개발인원 5명

  > FRONT_END: 윤창순 | 김영건

  > BACK_END : 윤태식 | 윤상돈

  > DESIGNER : 최정빈

## 일지

개발일지 노션 <https://thunder-hovercraft-e46.notion.site/685453da9c304cadacd0b2bfedb4e563>

## Stacks

[![CI](https://github.com/QBChaining/QBChaining-BE/actions/workflows/deploy.yml/badge.svg)](https://github.com/QBChaining/QBChaining-BE/actions/workflows/deploy.yml)

<div float: left; >
    <img src="https://img.shields.io/badge/NODE.JS-339933?style=flat&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/-EXPRESS-007ACC?style=flat&logo=EXPRESS&logoColor=white"/>
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white">
    <img src="https://img.shields.io/badge/Passport-34E27A?style=flat&logo=Passport&logoColor=white">
    <img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=white">
    <img src="https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white">
    <img src="https://img.shields.io/badge/Github Action-2088FF?style=flat&logo=GitHub Actions&logoColor=white">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white">

</div>

## 백엔드 팀원 소개

| 팀원   | 역할분담                                                                                   |
| ------ | ------------------------------------------------------------------------------------------ |
| 윤태식 | 질의 응답 게시판 CRUD , DB모델 설계, ngninx를 통한 https사용, 검색기능 구현                |
| 윤상돈 | 블로그 CRUD, DB모델 설계, 알림기능 구현 , github action과 aws code deploy를 통한 CI/CD기능 |

## ERD

![image](https://user-images.githubusercontent.com/107670953/192533007-182dcb4c-9e49-4abc-b111-c461858399e1.png)

## 라이브 러리 | Library

| 기술 스택        | Appliance                | Version |
| ---------------- | ------------------------ | ------- |
| Express          | Node.JS                  | 4.18.1  |
| CORS             | Request resource 제한    | 2.8.5   |
| dotenv           | 보안 토큰, 키 관련보안화 | 16.0.1  |
| Passport         | 소셜 로그인              | 0.6.0   |
| passport-github2 | 깃허브 로그인 모듈       | 1.0.1   |
| mysql2           | sql 사용                 | 2.3.3   |
| sequelize        | 시퀄라이즈 사용          | 6.21.3  |
| pm2              | 서버 지속적인 배포       | 5.2.0   |
| jsonwebtoken     | 토큰을 통한 암호화       | 8.5.1   |
| morgan           | 실시간 로그 확인         | 1.10.0  |

## 서비스 아키텍쳐

![image](https://user-images.githubusercontent.com/107670953/192524998-35de8648-f82c-431d-b142-1bc0f4c2734d.png)

## 기술선정이유

### passport

- API 기능 구현이 굉장히 많은 편에 속한 프로젝트이며 프론트엔드와 백엔드의 공통 에러를 해결하는 시간을 감안

- 실제 직접 구현도 가능하지만 프론트엔드가 github에 요청 후 정보를 가져오는 과정 중 github oauth client ID 와 client secret 노출이 있어 백엔드 서버에서 모든 과정을 진행하는 것이 보안에 더 좋다고 생각

### CI / CD 구현 이유

#### 코드의 잦은 수정과 배포 후 뒤늦은 에러 발견은 협업에서의 아주 부정적인 요소로 느낌

위와 같은 이유를 개선하기 위하여 CI / CD 구현을 진행하였습니다.

#### 선택지

- Jenkins

- GitHub Actions

#### Why github actions?

- 저희 프로젝트는 규모가 크지않아 GitHub Actions가 적합하다고 판단하였습니다.
