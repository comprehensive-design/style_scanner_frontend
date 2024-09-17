
import React, { useEffect, useState } from 'react';
import Ranking from '../Ranking';
import styled from 'styled-components';
import Footer from '../../../Components/Footer';

export default function Category() {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedSubcategory, setSelectedSubcategory] = useState('ALL');
    const [activeSortButton, setActiveSortButton] = useState('');

    const categories = {
        '전체': [],
        '여성': ['아우터', '상의', '팬츠', '스커트', '원피스', '신발', '가방', '악세사리', '기타'],
        '남성': ['아우터', '상의', '팬츠', '신발', '가방', '악세사리', '기타']
    };

    const categoryMap = {
        '전체': 'ALL',
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

    useEffect(() => { }, [selectedCategory, selectedSubcategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(categoryMap[category]);
        setSelectedSubcategory('ALL');
        setActiveSortButton('');
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategoryMap[subcategory]);
        setActiveSortButton(subcategory);
    };

    const SortButton = styled.button`
        color: ${props => (props.active ? 'black' : 'rgb(153, 153, 153)')};
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-weight: ${props => (props.active ? 'bold' : 'normal')};
        text-decoration: ${props => (props.active ? 'underline' : 'none')};
    `;

    return (
        <div className='totalWrap'>
            <div className='contentWrap'>
                <div className='categoryWrap'>
                    <p className='left boldSubTitle'>카테고리</p>
                    <HorizonLine />
                    <div>
                        <ul className='categoryUl'>
                            {Object.keys(categories).map((category, index) => (
                                <li key={index} className='suplists'>
                                    <SortButton
                                        onClick={() => handleCategoryClick(category)}
                                        active={selectedCategory === categoryMap[category]}
                                        className={`${selectedCategory === categoryMap[category] ? 'itemLinkOn' : 'itemLink'} supcateButton`}>
                                        {category}
                                    </SortButton>
                                    {selectedCategory === categoryMap[category] && categories[category].length > 0 && (
                                        <ul >
                                            {categories[category].map((subcategory, subIndex) => (
                                                <li key={subIndex} className='sublists'>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <SortButton
                                                        onClick={() => handleSubcategoryClick(subcategory)}
                                                        active={selectedSubcategory === subcategoryMap[subcategory]}
                                                        className={`${selectedSubcategory === subcategoryMap[subcategory] ? 'itemLinkOn' : 'itemLink'} subcateButton`}>
                                                        {subcategory}
                                                    </SortButton>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {selectedCategory && (
                    <Ranking
                        selectedCategory={selectedCategory}
                        selectedSubcategory={selectedSubcategory}
                    />
                )}
            </div>
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
        />
    );
};
