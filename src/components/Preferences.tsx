import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";

const PrecerencesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Precerences = styled.div`
  display: flex;
`;

const Preference = styled.div`
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
  &:before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: "";
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }
  &:after {
    background: #fff;
    border-bottom: 13px solid transparent;
    border-left: 10px solid #eee;
    border-top: 13px solid transparent;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid;
  border-radius: 3px;
  cursor: pointer;
`;

const GenerateButton = styled(Button)`
  color: #06d6a0;
  width: 200px;
  border-color: #26547c;
`;

const Preferences: FC = () => {
  const { selectedStyles } = useContext(AppContext);
  const { selectedTechniques } = useContext(AppContext);
  const { selectedThemes } = useContext(AppContext);
  const { newImageDescription, setNewImageDescription } =
    useContext(AppContext);
  const [result, setResult] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    (async () => {
      setLoading(true);

      const data = {
        style: selectedStyles.join(", "),
        subject: selectedThemes.join(", "),
        technique: selectedTechniques.join(", "),
      };

      fetch("./.netlify/functions/artistic-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setResult(data.image);
          setNewImageDescription(data.imgDescription);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setLoading(false);
    })();
  };

  if (loading) return <span>Loading</span>;

  return (
    <PrecerencesContainer>
      <h2>Your art will have the following properties</h2>
      <Precerences>
        {selectedStyles.map((style: string, index: number) => (
          <Preference key={index}>{style}</Preference>
        ))}
      </Precerences>
      <Precerences>
        {selectedTechniques.map((style: string, index: number) => (
          <Preference key={index}>{style}</Preference>
        ))}
      </Precerences>
      <Precerences>
        {selectedThemes.map((style: string, index: number) => (
          <Preference key={index}>{style}</Preference>
        ))}
      </Precerences>
      <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>

      <>{newImageDescription ? newImageDescription : ""}</>
      {result && result.length > 0 ? (
        <img className="result-image" src={result} alt="result" />
      ) : (
        <></>
      )}
    </PrecerencesContainer>
  );
};

export default Preferences;
