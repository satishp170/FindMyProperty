import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./category.css";

const categories = [
  {
    title: "Plots",
    link: "plot",
    image: "https://media.istockphoto.com/id/598098222/photo/sugarcane-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=rR_DGlsstMh69XTDBPrzZHcf6b1a9z3wjcpzcydolXE="
  },
  {
    title: "Villa",
    link: "villa",
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Residential",
    link: "three_bhk",
    image: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzaWRlbnRpYWwlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Farmhouses",
    link: "farmhouse",
    image: "https://media.istockphoto.com/id/1215011428/photo/summer-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=fU9Xp9-TMJ90vF6eu_RJc_kuTWA3Gzd-LGQiaJZDo24="
  },
];

const Category = ({ openLogin }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (type) => {
    if (user) {
      navigate(`/category/${type}`);
    } else {
      openLogin();
    }
  };

  return (
    <div className="category-section">
      <h2 className="category-title">Explore by Property Type</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(cat.link)}
            style={{ cursor: "pointer" }}
          >
            <img src={cat.image} alt={cat.title} />
            <div className="category-name">{cat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;