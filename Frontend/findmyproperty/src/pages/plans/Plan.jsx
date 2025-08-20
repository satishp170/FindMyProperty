import './plan.css';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';

const plans = {
    Seller: {
        color: '#007bff',
        plans: [
            {
                duration: '1 Month',
                price: 499,
                features: ['List up to 5 properties', 'Email Support', 'Basic Visibility'],
            },
            {
                duration: '3 Months',
                price: 1299,
                features: ['List 15 properties', 'Priority Support', 'Featured Listings'],
            },
            {
                duration: '12 Months',
                price: 3999,
                features: ['Unlimited Listings', 'Top Search Placement', '24/7 Support'],
            },
        ],
    },
    Buyer: {
        color: '#28a745',
        plans: [
            {
                duration: '1 Month',
                price: 299,
                features: ['Browse all listings', 'Save favorites', 'Basic Support'],
            },
            {
                duration: '3 Months',
                price: 799,
                features: ['Advanced Filters', 'Email Alerts', 'Priority Support'],
            },
            {
                duration: '12 Months',
                price: 2499,
                features: ['Early Access Listings', 'Exclusive Deals', '24/7 Support'],
            },
        ],
    },
    Trader: {
        color: '#fd7e14',
        plans: [
            {
                duration: '1 Month',
                price: 599,
                features: ['List & Buy', 'Basic Analytics', 'Basic Support'],
            },
            {
                duration: '3 Months',
                price: 1499,
                features: ['Advanced Analytics', 'Boosted Listings', 'Priority Support'],
            },
            {
                duration: '12 Months',
                price: 4999,
                features: ['Unlimited Access', 'Top Rankings', 'Consultant Support'],
            },
        ],
    },
};

// Helper to map duration to plan type
const mapDurationToPlan = (duration) => {
    switch (duration) {
        case '1 Month':
            return 'MONTHLY';
        case '3 Months':
            return 'QUARTERLY';
        case '12 Months':
            return 'YEARLY';
        default:
            return 'UNKNOWN';
    }
};

const Plan = () => {
    const navigate = useNavigate();
    const { uid } = useParams();

    const handleBuy = async (role, duration) => {
        const planType = mapDurationToPlan(duration);
        const id = parseInt(uid);
        const roleUpper = role.toUpperCase();

        try {
            const result = await UserService.buyPlan(id, roleUpper, planType);
            console.log('✅ Purchase successful:', result);
            alert('Plan purchased successfully!');

            // Redirect to profile using uid from localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const userId = parsedUser.uid || parsedUser.id; // use whichever key is correct
                navigate(`/profile/${userId}`);
            } else {
                console.warn('User not found in localStorage');
            }
        } catch (error) {
            console.error('❌ Purchase failed:', error);
            alert('Failed to purchase plan. Please try again.');
        }
    };

    return (
        <div className="plans-container">
            <h1>Choose a Plan That Fits Your Role</h1>
            <p className="subtext">Tailored plans for Sellers, Buyers, and Traders</p>

            <div className="columns-wrapper">
                {Object.entries(plans).map(([role, data]) => (
                    <div className="role-column" key={role}>
                        <div className="column-header" style={{ backgroundColor: data.color }}>
                            <h2>{role}</h2>
                        </div>

                        {data.plans.map((plan, index) => (
                            <div className="plan-card" key={index}>
                                <h3>{plan.duration}</h3>
                                <p className="price">₹{plan.price.toLocaleString('en-IN')}</p>
                                <ul className="feature-list">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>✔ {feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className="buy-button"
                                    style={{ backgroundColor: data.color }}
                                    onClick={() => handleBuy(role, plan.duration)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plan;