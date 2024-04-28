import React, { useState, useEffect } from 'react';
import './AutoComplete.css'; 

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setISLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        setISLoading(false)
      });
  }, []); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsOpen(true); 
  };

  const handleOptionSelect = (option) => {
    setSearchTerm(option.title); 
    setIsOpen(false); 
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setIsOpen(true); 
  };

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder='جستجو...'
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={() => handleClearInput()} 
      />
      <ul className={`autocomplete-list ${isOpen ? 'open' : ''}`}> 
      {isLoading ? <p>در حال بارگذاری</p> :
        filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <li key={option.id} onClick={() => handleOptionSelect(option)}>
              {option.title}
            </li>
          ))
        ) : (
          <li>متاسفانه آیتمی پیدا نشد</li>
        )}
      
      </ul>
    </div>
  );
};

export default Autocomplete;