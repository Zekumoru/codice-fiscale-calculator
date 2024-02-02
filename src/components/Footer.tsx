const Footer = () => {
  return (
    <footer className="mt-4">
      <h4 className="font-bold text-lg">Credits</h4>
      <p>
        Created by{" "}
        <a
          href="https://github.com/Zekumoru/codice-fiscale-calculator"
          rel="noopener noreferrer"
          className="underline"
        >
          ZekumoruDGH
        </a>
      </p>
      <p>
        Comune API by{" "}
        <a
          href="https://github.com/Samurai016/Comuni-ITA"
          rel="noopener noreferrer"
          className="underline"
        >
          Samurai016
        </a>
      </p>
      <p>
        Favicon:{" "}
        <a
          href="https://www.flaticon.com/free-icons/business-and-finance"
          title="business and finance icons"
          className="underline"
          rel="noopener noreferrer"
        >
          Business and finance icons created by Soodesign - Flaticon
        </a>
      </p>
    </footer>
  );
};

export default Footer;
