export const userInfo = JSON.parse(localStorage.getItem('userinfo'));
export const fetchwithGetMethod = async (url, data) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
  export const fetchWithPostmethod = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
  export const Post = async (data) => {
    try {
      const response = await fetch("https://finbook.softsolin.com/apinew/myapi.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&'),
    
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  export const updateVoucher = async (data) => {
    try {
      const response = await fetch("https://finbook.softsolin.com/apinew/myapi_json.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  export const AddaccountPOST = async (data) => {
    try {
      const response = await fetch("https://finbook.softsolin.com/apinew/myapi_json.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };