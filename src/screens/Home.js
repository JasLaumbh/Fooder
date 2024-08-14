import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://fooder-mern-app.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0] || []); // Ensure response is an array
    setFoodCat(response[1] || []);  // Ensure response is an array
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/*NavBar*/}
      <div><Navbar /></div>

      {/*Carousel*/}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }} >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-labelledby="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                  {/*<button className='btn btn-outline-success text-white bg-success' type='submit'>Search</button>*/}
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1585503913867-f3382c5d1122?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>


        </div>
      </div>

      {/*Card Container*/}
      <div className="container">
        {foodCat.length > 0 ? foodCat.map((data) => (
          <div key={data._id} className="mb-4">
            <h3 className="fs-2 m-3">{data.CategoryName}</h3>
            <hr />
            <div className="row">
              {foodItem.length > 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-4 mb-4">
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}

                      />
                    </div>
                  ))
                : <div>No such data Found</div>
              }
            </div>
          </div>
        )) : ""}
      </div>
      <Footer />
    </div>
  );
}