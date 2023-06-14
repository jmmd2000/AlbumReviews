import classes from "./HomeContent.module.css";

import { GithubLogo, LinkedinLogo, Globe } from "@phosphor-icons/react";

// This just displays the content for the home page.

const HomeContent = () => {
  return (
    <div className={classes.homeContent}>
      <h1 className={classes.contentHeading}>Hey there!</h1>
      <p className={classes.contentBody}>
        Welcome to my album reviews. This is just a place for me to keep track
        of new albums and what I think of them. Each review is based on my own
        enjoyment of the album. <em>Album X</em> might be better technically
        than <em>album Y</em>, but I might enjoy <em>album Y</em> more, so I'll
        give it a higher rating.
      </p>
      <p className={classes.contentBody}>
        Each song in an album is given a rating as follows:
      </p>
      <ul className={classes.contentList}>
        <li className={`${classes.rating} ${classes.perfect}`}>Perfect</li>
        <li className={`${classes.rating} ${classes.amazing}`}>Amazing</li>
        <li className={`${classes.rating} ${classes.great}`}>Great</li>
        <li className={`${classes.rating} ${classes.good}`}>Good</li>
        <li className={`${classes.rating} ${classes.meh}`}>Meh</li>
        <li className={`${classes.rating} ${classes.awful}`}>Awful</li>
        <li className={`${classes.rating} ${classes.nonSong}`}>Non-song</li>
      </ul>
      <p className={classes.contentBody}>
        Where each rating is equal to a number from 1 - 7. Non-song just denotes
        that the track is not a song, such as an intro, interlude or skit, and
        removes it from the album average.You can view albums, or artists by
        clicking the links up top.
      </p>
      {/* <p className={classes.contentBody}>You can find my socials below!</p> */}
      <p className={classes.contentBody}>Thanks for visiting!</p>
      <p className={classes.contentBody}>James.</p>
      {/* <div className={classes.socials}>
        <a href="https://github.com/jmmd2000">
          <GithubLogo
            size={36}
            weight="light"
            color="white"
          />
        </a>
        <a href="https://www.linkedin.com/in/james-doyle-4b47ba245/">
          <LinkedinLogo
            size={36}
            weight="light"
            color="white"
          />
        </a>
        <a href="https://www.jamesmddoyle.com/">
          <Globe
            size={36}
            weight="light"
            color="white"
          />
        </a>
      </div> */}
    </div>
  );
};

export default HomeContent;
