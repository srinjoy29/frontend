
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      '/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

// export function fetchProductsByFilters(filter, sort, pagination, admin) {
//   // filter = {"category":["smartphone","laptops"]}
//   // sort = {_sort:"price",_order="desc"}
//   // pagination = {_page:1,_limit=10}

//   let queryString = '';
//   for (let key in filter) {
//     const categoryValues = filter[key];
//     if (categoryValues.length) {
//       queryString += `${key}=${categoryValues}&`;
//     }
//   }
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }
//   if(admin){
//     queryString += `admin=true`;
//   }

//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       '/products?' + queryString
//     );
//     const data = await response.json();
//     const totalItems = await response.headers.get('X-Total-Count');
//     resolve({ data: { products: data, totalItems: +totalItems } });
//   });
// }

export function fetchProductsByFilters(filter, sort, pagination, query, admin) {
  let queryString = '';

  // Add search query if provided
  if (query) {
    queryString += `query=${encodeURIComponent(query)}&`;
  }

  // Add filters (categories, brands, etc.)
  for (let key in filter) {
    const values = filter[key];
    if (values && values.length > 0) {
      values.forEach((value) => {
        queryString += `${key}=${encodeURIComponent(value)}&`;
      });
    }
  }

  // Add sorting options (_sort, _order)
  for (let key in sort) {
    if (sort[key]) {
      queryString += `${key}=${encodeURIComponent(sort[key])}&`;
    }
  }

  // Add pagination (_page, _limit)
  for (let key in pagination) {
    if (pagination[key]) {
      queryString += `${key}=${encodeURIComponent(pagination[key])}&`;
    }
  }

  // Add admin flag if present
  if (admin) {
    queryString += `admin=true&`;
  }

  // Remove trailing '&' if there are any, for cleaner URLs
  queryString = queryString.endsWith('&') ? queryString.slice(0, -1) : queryString;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/products?' + queryString);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      const totalItems = parseInt(response.headers.get('X-Total-Count'), 10);

      resolve({ data: { products: data, totalItems } });
    } catch (error) {
      reject({ error: error.message });
    }
  });
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('/categories');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands');
    const data = await response.json();
    resolve({ data });
  });
}
