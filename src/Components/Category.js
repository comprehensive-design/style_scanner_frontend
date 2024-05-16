import styles from '../css/Category.module.css';
import React, { useEffect, useState } from 'react';
import Ranking from './Ranking';
import styled from 'styled-components';
import { stepButtonClasses } from '@mui/material';

export default function Category() {
    const activeStyle = {
        color: 'black'
    };

    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [activeSortButton, setActiveSortButton] = useState('');

    const categories = {
        '전체': [],
        '여성': ['아우터', '상의', '팬츠', '스커트', '원피스', '신발', '가방', '악세사리', '기타'],
        '남성': ['아우터', '상의', '팬츠', '신발', '가방', '악세사리', '기타']
    };

    useEffect(() => {
        // selectedCategory나 selectedSubcategory가 변경될 때마다 호출되는 부분
    }, [selectedCategory, selectedSubcategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory(''); // 상위 카테고리를 클릭했을 때 하위 카테고리 리셋
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        //   setActiveSortButton(subcategory); // 활성화된 버튼으로 설정
    };

    const SortButton = styled.button`
    color: ${props => (props.active ? 'black' : 'rgb(153, 153, 153)')};
    background-color: transparent;
    text-decoration: none;
    border: none;
    cursor: pointer;
    // font-weight: ${props => (props.active ? 'bold' : 'normal')};
    `;

    return (
        <div className={styles.totalWrap}>
            <div className={styles.categoryWrap}>
                <p id={styles.categoryNa}>카테고리</p>
                <HorizonLine></HorizonLine>

                <div className={styles.categoryList}>
                    <ul className={styles.categoryUl}>
                        {Object.keys(categories).map((category, index) => (
                            <li key={index} className={styles.suplists}>
                                <SortButton onClick={() => {
                                    handleCategoryClick(category);
                                    setActiveSortButton('');
                                }}
                                active={selectedCategory === category}
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
            </div>
            <div className={styles.rankingWrap}>
                {selectedCategory && <Ranking selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} />}
            </div>
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