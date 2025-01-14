import {useEffect, useState} from "react";
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination'
import './movies.scss'
import {MOVIES_PER_PAGE} from '../../constants/index'


const Movies = () => {
  const [movies, setMovies] = useState([])
  const [totalMovies, setTotalMovies] = useState('')
  const [selectedPage, setSelectedPage] = useState(1)

  useEffect(() => {
    const paginate = `_page=${selectedPage}&_limit=${MOVIES_PER_PAGE}&`
    const host = process.env.REACT_APP_HOST
    const url = host + '/movies?' + paginate;
    fetch(url)
    .then((res) => {
      setTotalMovies(res.headers.get('x-total-count'))
      return res.json()
    }).then((movies) => {
      setMovies(movies)
    })
  },[selectedPage])

  const category_list = (movie) => {
    return movie.categories.join(', ')
  }
  return (
    <>
      <Header />
      {movies && movies.length ? (
        <div className="container pt-5">
          <div  className="row">
            {movies.map((movie) => (
                <div key={movie.id} className="col-lg-3 col-md-3 col-sm-8 col-xs-12 padding-right-30 padding-left-30 padding-bottom-30">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-8 col-xs-8">
                      <div className="product-item no-padding">
                        <div className="pi-img-wrapper">
                            <img className="img-responsive border-radius-20" alt="" src={movie.images[0]} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-8 col-xs-8">
                      <div className="film-info film-xs-info">
                          <h3 className="text-center text-sm-left text-xs-left bold margin-top-5 font-sm-18 font-xs-14" style={{maxHeight: 30+"px", minHeight: 30+"px"}}>
                            <a href="javascript:void(0);">{movie.name}</a>
                          </h3>
                          <ul className="list-unstyled font-lg font-family-san font-sm-15 font-xs-14">
                            <li style={{maxHeight: 50+"px"}}><span className="bold">
                                Thể loại:</span> {category_list(movie)}</li>
                            <li><span className="bold">
                                Thời lượng:</span> {movie.times} 
                                phút
                            </li>
                          </ul>
                      </div>
                      <div className="text-center padding-bottom-30" style={{minHeight: 85+"px"}}>
                        <a style={{display: "block"}} className="btn btn-2 btn-mua-ve2 fancybox-fast-view">
                          <span><i className="fa fa-ticket mr3"></i></span>
                            MUA VÉ
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            <div className="row">
              <Pagination 
                totalMovies={totalMovies}
                setSelectedPage={setSelectedPage}
                selectedPage={selectedPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <p> Không có phim </p>
      )}
    </>
  );
}

export default Movies;
