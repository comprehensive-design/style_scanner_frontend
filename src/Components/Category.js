import styles from '../css/Category.module.css';
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import Ranking from './Ranking';
import styled from 'styled-components';

export default function Category() {
    const activeStyle = {
        color : 'black'
    };

    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [activeSortButton, setActiveSortButton] = useState('');

    const categories = {
        '전체': [],
        '여성': ['아우터', '상의', '팬츠', '스커트', '원피스', '신발', '가방','악세사리', '기타'],
        '남성': ['아우터', '상의', '팬츠', '신발', '가방', '악세사리', '기타']
    };

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setSelectedSubcategory(''); // 상위 카테고리를 클릭했을 때 하위 카테고리 리셋
  };

  const handleSubcategoryClick = (subcategory) => {
      setSelectedSubcategory(subcategory);
    //   setActiveSortButton(subcategory); // 활성화된 버튼으로 설정
  };
    
  const items = [
      { name: 'Item 1', category: '전체' },
      { name: 'Item 2', category: '여성' },
      { name: 'Item 3', category: '여성', subcategory: '아우터' },
      { name: 'Item 4', category: '여성', subcategory: '상의' },
      { name: 'Item 5', category: '여성', subcategory: '팬츠' },
      { name: 'Item 6', category: '여성', subcategory: '스커트' },
      { name: 'Item 7', category: '여성', subcategory: '원피스' },
      { name: 'Item 8', category: '여성', subcategory: '신발' },
      { name: 'Item 9', category: '여성', subcategory: '가방' },
      { name: 'Item 10', category: '여성', subcategory: '악세사리' },
      { name: 'Item 11', category: '여성', subcategory: '기타' },

      { name: 'Item 12', category: '남성' },
      { name: 'Item 13', category: '남성', subcategory: '아우터' },
      { name: 'Item 14', category: '남성', subcategory: '상의' },
      { name: 'Item 15', category: '남성', subcategory: '팬츠' },
      { name: 'Item 16', category: '남성', subcategory: '신발' },
      { name: 'Item 17', category: '남성', subcategory: '가방' },
      { name: 'Item 18', category: '남성', subcategory: '악세사리' },
      { name: 'Item 19', category: '남성', subcategory: '기타' },
];

const SortButton = styled.button` 
    color: ${props => (props.active ? 'black' : 'rgb(153, 153, 153)')};
    background-color: transparent;
    text-decoration: none;
    border: none;
    cursor: pointer;
    // font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

    return(
        <div id = {styles.categoryDiv}>
            <p id={styles.categoryNa}>카테고리</p>
            <HorizonLine></HorizonLine>
      
            <div id={styles.categoryList}>
            <ul className={styles.categoryUl}>
                    {Object.keys(categories).map((category, index) => (
                        <li key={index} className={styles.suplists}>
                            <SortButton onClick={() => {
                                handleCategoryClick(category); 
                                setActiveSortButton('');
                            }}
                            active = {selectedCategory === category}
                            className={`${selectedCategory === category ? 'itemLinkOn' : 'itemLink'}  ${styles.supcateButton}`}>{category}</SortButton>
                            {selectedCategory === category &&
                                <ul className={styles.subcategoryUl}>
                                    {categories[category].map((subcategory, subIndex) => (
                                        <li key={subIndex} className={styles.sublists}>
                                            <SortButton onClick={() => {
                                                handleSubcategoryClick(subcategory);
                                                setActiveSortButton(subcategory);
                                            }} 
                                            active={selectedSubcategory === subcategory}
                                            className={`${selectedSubcategory === subcategory ? 'itemLinkOn' : 'itemLink'} ${styles.subcateButton}`}>{subcategory}</SortButton>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </li>
                    ))}
                </ul>

            </div>
            {/* <Ranking selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} /> */}

        </div>
    )
}

const HorizonLine = () => {
    return (
      <div
        style={{
          width: "80%",
          borderBottom: "2px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };
  
