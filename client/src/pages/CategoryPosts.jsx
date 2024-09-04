import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import LoadingPage from '../components/LoadingPage';

import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setPosts(response?.data);

        const uniqueAuthorIds = [...new Set(response?.data.map(post => post.creator))];

        // Fetch authors based on these IDs
        const authorPromises = uniqueAuthorIds.map(id => axios.get(`${import.meta.env.REACT_APP_BASE_URL}/users/${id}`));
        const authorResponses = await Promise.all(authorPromises);

        const authorsData = {};
        authorResponses.forEach(response => {
          const author = response?.data;
          authorsData[author._id] = author;
        });

        setAuthors(authorsData);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [category]);

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
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
    <section className='container-fluid row space-around' style={{ margin: 'auto' }}>
      {isLoading ? (
        <LoadingPage />
      ) : currentPosts.length ? (
        <>
          {currentPosts.map(({ _id: id, title, category, description, thumbnail, creator, createdAt }) => (
            <Card className='post-card col-lg-3 col-md-6 col-sm-12 mx-auto my-3' key={id} style={{ width: '21rem', padding: '0.65rem' }}>
              <Card.Img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} />
              <Card.Body>
                <Link to={`/posts/${id}`}>
                  <Card.Title className='card-title'>
                    {title.length > 25 ? title.substring(0, 25) + '...' : title}
                  </Card.Title>
                  <Card.Text dangerouslySetInnerHTML={{__html: description.length > 150 ? description.substring(0, 150) + '...' : description,}}></Card.Text>
                </Link>
                <div className='d-flex justify-content-between' style={{ margin: '2rem 0 -1rem 0', alignItems: 'flex-end' }}>

                  <Link to={`/posts/users/${creator}`} className='post-author'>
                    <div className="author-avatar">
                      <img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${authors[creator]?.avatar || 'nullPic.png'}`} alt={authors[creator]?.name} />
                    </div>
                    <div className="author-details">
                      <h6>By: {capitalize(authors[creator]?.name)}</h6>
                      <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>
                    </div>
                  </Link>
                  
                  <Link to={`/posts/categories/${category}`} className='meBtn category-btn'>
                    {category.toUpperCase().substring(0, 1) + category.substring(1)}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
          {posts.length > postsPerPage && (
            <Pagination className='custom-pagination justify-content-center mt-4'>
              {renderPaginationItems()}
            </Pagination>
          )}
        </>
      ) : (
        <h2 className='text-center pt-5'>No posts found.</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
