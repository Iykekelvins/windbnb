import Head from "next/head";
import Modal from "../components/Modal";
import Link from "next/link";
import Image from "next/image";
import headerStyles from "../styles/Header.module.css";
import homeStyles from "../styles/Home.module.css";
import { stays } from "../public/stays";
import { useState } from "react";

const locations = [...new Set(stays.map((item) => item.city))];

export default function Home() {
  const [places, setPlaces] = useState(stays);
  const [findLocation, setFindLocation] = useState(locations);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [guest, setGuest] = useState("");

  const checkLocation = (e) => {
    e.preventDefault();
    const filterList = stays.filter(
      (item) => item.city.toLowerCase().indexOf(location[0].toLowerCase()) > -1
    );

    if (location && filterList.length > 0) {
      setPlaces(filterList);
      setIsVisible(false);
      setLocation(location);
    } else if (!location || filterList.length === 0) {
      return null;
    }
  };

  const checkGuests = (e) => {
    e.preventDefault();
    const filterList = stays.filter(
      (item) =>
        (item.maxGuests >= Math.abs(guest) ||
          (item.maxGuests >= Math.abs(guest) &&
            item.city.includes(location))) &&
        item.beds != null
    );
    if (guest && filterList.length > 0) {
      setPlaces(filterList);
      setIsVisible(false);
      setError(false);
      setGuest("");
    } else if (!guest || filterList.length === 0) {
      setError(true);
      return null;
    }
  };

  return (
    <div>
      <Head>
        <title>Windbnb</title>
        <meta name="description" content="online bookings" />
        <link rel="icon" href="/triangleLogo.png" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
      </Head>
      <Modal
        location={location}
        guest={guest}
        stays={stays}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        findLocation={findLocation}
        setGuest={setGuest}
        setPlaces={setPlaces}
        setLocation={setLocation}
        checkLocation={checkLocation}
        checkGuests={checkGuests}
      />
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <div className={headerStyles.logo}>
            <Image src="/logo.svg" alt="logo" height={100} width={150} />
          </div>
          <div>
            <div className={headerStyles.input_box}>
              <form onSubmit={checkLocation}>
                <input
                  type="text"
                  className={error ? `error` : headerStyles.input}
                  value={location}
                  placeholder="Helsinki, Finland"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </form>
              <div className={headerStyles.border}></div>
              <form onSubmit={checkGuests}>
                <input
                  type="text"
                  className={error ? `error` : headerStyles.add_input}
                  value={guest}
                  placeholder="Add guests"
                  onChange={(e) => setGuest(e.target.value)}
                />
              </form>
              <div className={headerStyles.border}></div>
              <button
                className={headerStyles.btn}
                onClick={() => setIsVisible(!isVisible)}
              >
                <i
                  className="fas fa-search"
                  style={{
                    color: "rgba(235, 87, 87, 1)",
                    paddingRight: "0.8rem",
                    fontSize: "1rem",
                  }}
                ></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className={homeStyles.top}>
        <h1>Stays in Finland</h1>
        <p>12+ Stays</p>
      </div>

      <section className={homeStyles.stays}>
        {places.map((place) => {
          const { superHost, title, type, rating, beds, photo, id } = place;
          return (
            <article key={id}>
              <Image
                src={photo}
                alt=""
                height={350}
                width={450}
                className={homeStyles.img}
              />
              <div className={homeStyles.article_info}>
                {superHost ? (
                  <h4 className={homeStyles.host}>SUPER HOST</h4>
                ) : null}
                <p className={homeStyles.type}>{type}</p>
                {beds === 1 ? (
                  <p>{beds} bed</p>
                ) : beds > 1 ? (
                  <p>{beds} beds</p>
                ) : null}
                <p className={homeStyles.rating}>
                  <i
                    className="fas fa-star"
                    style={{
                      color: "rgba(235, 87, 87, 1)",
                      marginRight: "0.4rem",
                    }}
                  ></i>
                  {rating}
                </p>
              </div>
              <h3 className={homeStyles.title}>{title}</h3>
            </article>
          );
        })}
      </section>
      <footer>
        <p style={{ textAlign: "center", margin: "3rem auto" }}>
          created by{" "}
          <Link href="https://github.com/Iykekelvins/">Kelvin Ochubili</Link> -
          <Link href="https://devchallenges.io/"> devchallenges.io</Link>
        </p>
      </footer>
    </div>
  );
}
