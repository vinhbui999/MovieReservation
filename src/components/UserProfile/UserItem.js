import React, { Component, WithStyles } from 'react'
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css"
import $ from 'jquery'
import firebase from 'firebase'
import firebaseConfig from "../../firestore"
import { Link } from 'react-router-dom';

export default class UserItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: []
      }
   }
   componentDidMount() {
      this.firebaseRender()
      this.renderState()
   }

   renderItem = () => {
      return this.state.data && this.state.data.map((item, index) => {
         if (this.state.data.length < 1) {
            return (
               <h3 className="user-profile-container-main-container-item-warning">
                  No favorite Movies found :(</h3>
            )
         }
         else
            return (
               <Link to={`/details/movie/${item.id}`}>
                  <div className="carousel-overlay" style={{
                     background: `linear-gradient(
                rgba(0, 0, 0, 0.6),
                rgba(0, 0, 0, 0.6)
              ) center center no-repeat, #fff url('https://image.tmdb.org/t/p/w1280/${item.photo}') center top no-repeat`, backgroundSize: 'cover, cover'
                  }}>
                  </div>

                  <img
                     src={`https://image.tmdb.org/t/p/w1280/${item.photo}`}
                     style={{
                        display: 'block',
                        height: '92.5%',
                        margin: 'auto',
                        width: '92.5%'
                     }}
                  />
                  <div class="carousel-profile-caption">
                     <p class="carousel-profile-category backF">{item.bio}</p>
                     <h3 class="carousel-profile-h3 backF">{item.tenPhim}</h3>
                     <p class="carousel-profile-p backF">{item.doDai}| {item.genres} | Release: {item.ngayChieu}</p>
                  </div>
               </Link>
            )
      })

   }
   firebaseRender = async () => {
      let uid = localStorage.getItem('uid')
      let arrToPush = []
      const db = firebase.firestore();
      if (uid !== null) {
         await db.collection("user").doc(uid).collection("favorite").get()
            .then((snapshot) => {
               snapshot.docs.forEach((doc) => {
                  arrToPush.push(doc.data())
               });
            });
      }
      console.log(arrToPush)
      return arrToPush
   }
   renderState = async () => {
      const arrToPush = await this.firebaseRender()
      console.log(arrToPush)
      this.setState({
         data: arrToPush
      })
      console.log(this.state.data)
   }
   render() {
      return (
         <div className="user-profile-container-main-container-item">
            < div
               style={{
                  paddingBottom: '30px',
                  position: 'relative'
               }
               }
            >
               <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={false}
                  className=""
                  containerClass="container1"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside
                  responsive={{
                     desktop: {
                        breakpoint: {
                           max: 3000,
                           min: 1024
                        },
                        items: 1
                     },
                     mobile: {
                        breakpoint: {
                           max: 464,
                           min: 0
                        },
                        items: 1
                     },
                     tablet: {
                        breakpoint: {
                           max: 1024,
                           min: 464
                        },
                        items: 1
                     }
                  }}
                  showDots
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
               >
                  {this.renderItem()}

               </Carousel>
            </div >

         </div>


      )
   }
}

