import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import LoadingPage from '../components/LoadingPage';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 12;

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/users`);
        setAuthors(response?.data);
      }
      catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }

    fetchAuthors();
  }, [])

  const capitalize = (fullName) => {
    if (typeof fullName !== 'string') return '';
  
    const nameParts = fullName.trim().split(' ');
  
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    }
  
    const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1).toLowerCase();
  
    return `${firstName} ${lastName}`.trim();
  };

  ///////////////////////////////////////////////////// Pagination
  // Total pages
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  // Current authors
  const indexOfLastPost = currentPage * authorsPerPage;
  const indexOfFirstPost = indexOfLastPost - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers with ellipses
  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxPagesToShow = 3;

    paginationItems.push(
      <Pagination.First key="first" onClick={() => changePage(1)} disabled={currentPage === 1} />
    );
    paginationItems.push(
      <Pagination.Prev key="prev" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} />
    );

    if (currentPage > maxPagesToShow) {
      paginationItems.push(
        <Pagination.Item key={1} onClick={() => changePage(1)}>
          {1}
        </Pagination.Item>
      );
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => changePage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - maxPagesToShow + 1) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      paginationItems.push(
        <Pagination.Item key={totalPages} onClick={() => changePage(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    paginationItems.push(
      <Pagination.Next key="next" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} />
    );
    paginationItems.push(
      <Pagination.Last key="last" onClick={() => changePage(totalPages)} disabled={currentPage === totalPages} />
    );

    return paginationItems;
  };

  return (
    <section className="authors">
      {isLoading?
        <LoadingPage />
      :
        (
        authors.length ?
        <div className="container d-flex row justify-content-around m-auto">
          {
            currentAuthors.map((author) => {
              return<Link key={author._id} to={`/posts/users/${author._id}`}  className='authors my-3 col-sm-12 col-md-6 col-lg-3'>
                <Card style={{ padding : '0.65rem', display : 'flex', flexDirection : 'row' }}>
                  <Card.Img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar? author.avatar : 'nullPic.png'}`} style={{width : '5.5rem', height : '100%', borderRadius : '4px'}} />
                  <Card.Body>
                    <Card.Title style={{whiteSpace: 'noWrap'}}>{capitalize(author.name)}</Card.Title>
                    <Card.Text><small>Number of posts:</small> {author.posts}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            })
          }
          {authors.length > authorsPerPage && (
            <Pagination className='custom-pagination justify-content-center mt-4'>
              {renderPaginationItems()}
            </Pagination>
          )}
        </div>
        :
        <h2 className='text-center pt-5'>No users/authors found.</h2>
        )
      }
    </section>
  )
}

export default Authors