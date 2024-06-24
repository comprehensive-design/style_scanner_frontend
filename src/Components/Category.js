import styles from '../css/Category.module.css';
import React, { useEffect, useState } from 'react';
import Ranking from './Ranking';
import styled from 'styled-components';
import Footer from './Footer';

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

    const categoryMap = {
        '여성': 'WOMEN',
        '남성': 'MEN'
    };

    const subcategoryMap = {
        '아우터': 'OUTER',
        '상의': 'TOP',
        '팬츠': 'PANTS',
        '스커트': 'SKIRT',
        '원피스': 'ONE_PIECE',
        '신발': 'SHOES',
        '가방': 'BAG',
        '악세사리': 'ACC',
        '기타': 'ETC'
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
        setActiveSortButton(subcategory); // 활성화된 버튼으로 설정
    };

    const SortButton = styled.button`
        color: ${props => (props.active ? 'black' : 'rgb(153, 153, 153)')};
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-weight: ${props => (props.active ? 'bold' : 'normal')};
        text-decoration: ${props => (props.active ? 'underline' : 'none')};
    `;

    const getMappedCategory = (category) => categoryMap[category] || category;
    const getMappedSubcategory = (subcategory) => subcategoryMap[subcategory] || subcategory;

    return (
        <div className={styles.pageWrap}>
            <div className={styles.totalWrap}>
                <div className={styles.contentWrap}>
                    <div className={styles.categoryWrap}>
                        <p id={styles.categoryNa}>카테고리</p>
                        <HorizonLine />

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
                                                        &nbsp;&nbsp;&nbsp;&nbsp;
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
                        {selectedCategory && (
                            <Ranking
                                selectedCategory={getMappedCategory(selectedCategory)}
                                selectedSubcategory={getMappedSubcategory(selectedSubcategory)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const HorizonLine = () => {
    return (
        <div
            style={{
                width: "100%",
                borderBottom: "2px solid #aaa",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        >
        </div>
    );
};
