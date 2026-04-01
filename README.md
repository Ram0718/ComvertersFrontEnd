# ⚡ ConvertersHub

A modern, responsive unit converter web application with a beautiful dark/light mode interface. Convert between various units including length, weight, volume, data storage, time zones, and currencies.

![ConvertersHub Preview](https://via.placeholder.com/800x400/2dbe9b/ffffff?text=ConvertersHub+Preview)

## 🌟 Features

- **📏 Length Conversion**: Convert between meters, kilometers, centimeters, millimeters, feet, inches, and miles
- **⚖️ Weight Conversion**: Convert between kilograms, grams, milligrams, pounds, and ounces
- **🧴 Volume Conversion**: Convert between liters, milliliters, cubic meters, gallons, pints, and fluid ounces
- **💾 Data Conversion**: Convert between various data storage units (MB to GB, GB to TB, etc.)
- **🌍 Time Zone Conversion**: Convert time between different time zones
- **💱 Currency Conversion**: Convert between multiple currencies with real-time rates
- **🌙 Dark/Light Mode**: Toggle between dark and light themes
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast & Lightweight**: Built with vanilla JavaScript for optimal performance

## 🚀 Live Demo

- **Frontend**: [Deploy on your preferred static hosting]
- **Backend API**: [https://convertershub-7.onrender.com](https://convertershub-7.onrender.com)

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript for functionality
- **Fetch API**: For making HTTP requests to the backend

### Backend
- **Java SpringBoot**: Java 25

- **RESTful API**: Clean and simple API design

### Deployment
- **Render**: Backend deployment platform
- **Static Hosting**: Frontend can be deployed to GitHub Pages, Netlify, Vercel, etc.

## 📋 Prerequisites

- Node.js (for backend development)
- Git
- A modern web browser

## 🔧 Installation & Setup

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ram0718/ComvertersFrontEnd.git
   cd ComvertersFrontEnd
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process required!

### Backend Setup (for development)

1. **Clone the backend repository** (if available)
   ```bash
   git clone <your-backend-repo-url>
   cd <backend-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Update API URL** (if needed)
   - Run the `update-api-url.bat` script
   - Or manually update the `API_BASE` variable in `app.js`

## 🚀 Deployment

### Frontend Deployment

Deploy the static files (`index.html`, `app.js`, `style.css`) to any static hosting service:

#### Option 1: GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Get a custom domain if desired

#### Option 3: Vercel
1. Connect your GitHub repository to Vercel
2. Automatic deployments with preview URLs
3. Global CDN for fast loading

### Backend Deployment

The backend is already deployed on Render at:
**https://convertershub-7.onrender.com**

## 📡 API Endpoints

### Conversion Endpoints
```
POST /convert/length   - Convert length units
POST /convert/weight   - Convert weight units
POST /convert/volume   - Convert volume units
```

**Request Body:**
```json
{
  "value": 1,
  "from": "m",
  "to": "ft"
}
```

### Data Conversion
```
GET /data/{conversion-type}/{value}
```

**Examples:**
- `GET /data/mb-to-gb/1024` - Convert MB to GB
- `GET /data/gb-to-tb/1` - Convert GB to TB

### Time Zone Conversion
```
POST /time/timezone?from={timezone1}&to={timezone2}
```

**Example:**
- `POST /time/timezone?from=UTC&to=IST`

## 🎨 Customization

### Adding New Conversion Types

1. Add a new tab in `index.html`
2. Create the corresponding section with form elements
3. Add conversion logic in `app.js`
4. Implement the backend endpoint

### Styling

- Colors and themes can be modified in `style.css`
- CSS custom properties (variables) are used for easy theming
- Responsive breakpoints are defined for different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Testing

Test the endpoints using curl:

```bash
# Length conversion
curl -X POST https://convertershub-7.onrender.com/convert/length \
  -H "Content-Type: application/json" \
  -d '{"value": 1, "from": "m", "to": "ft"}'

# Data conversion
curl https://convertershub-7.onrender.com/data/mb-to-gb/1024

# Time zone conversion
curl -X POST "https://convertershub-7.onrender.com/time/timezone?from=UTC&to=IST"
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ram** - [GitHub](https://github.com/Ram0718)

## 🙏 Acknowledgments

- Icons from various free icon libraries
- Color scheme inspired by modern design trends
- Built with ❤️ using vanilla JavaScript

---

**⭐ Star this repository if you found it helpful!**
