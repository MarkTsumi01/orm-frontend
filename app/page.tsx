"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAlbums = async () => {
  try {
    const response = await api.get("/albums");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

interface IAlbum {
  id: number;
  title: string;
  remark: string;
}

const Page = () => {
  const [data, setData] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsData = await getAlbums();
        setData(albumsData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data, 'data from api');
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Can't Fetch APIs</div>;
  }

  return (
    <div>
      <h1>Test APIs</h1>
      {/* loop data from api */}
      {data.map((album: IAlbum) => (
        <div key={album.id}>
          <div>{album.title}</div>
          <div>{album.remark}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
