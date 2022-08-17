/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { theme } from "../../Utility/constants";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/CommonReducer/CommonAction";
import { convertToBase64 } from "../../Utility/Utility";
import { getSATquestions } from "../../services/checking.api";
const alphabeticalIndex = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};
function SATconfiguration() {
  // dispatch
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([
    {
      id: Math.floor(Math.random() * 1111),
      question: "What is CLp-Ctr?",
      type: "objective",
      optionType: "text",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: "Option 3",
      marks: 5,
    },
    {
      id: Math.floor(Math.random() * 1111),
      question: "What is Barcode?",
      type: "objective",
      optionType: "text",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: "Option 1",
      marks: 2,
    },
    {
      id: Math.floor(Math.random() * 1111),
      question: "What is Line Area Supervisor?",
      type: "subjective",
      marks: 10,
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    id: Math.floor(Math.random() * 1111),
    question: "",
    type: "objective",
    optionType: "text",
    A: "",
    B: "",
    C: "",
    D: "",
    correct: "",
    marks: "",
  });

  const addNewQuestion = () => {
    if (newQuestion?.type === "objective") {
      setQuestions([
        ...questions,
        {
          id: newQuestion.id,
          question: newQuestion.question,
          type: newQuestion.type,
          optionType: newQuestion.optionType,
          options: [newQuestion.A, newQuestion.B, newQuestion.C, newQuestion.D],
          correct: newQuestion.correct,
          marks: newQuestion.marks,
        },
      ]);
    } else {
      setQuestions([
        ...questions,
        {
          id: newQuestion.id,
          question: newQuestion.question,
          type: newQuestion.type,
          marks: newQuestion.marks,
        },
      ]);
    }
    setNewQuestion({
      id: Math.floor(Math.random() * 1111),
      question: "",
      type: "objective",
      optionType: "text",
      A: "",
      B: "",
      C: "",
      D: "",
      correct: "",
      marks: "",
    });
  };

  const fileHandler = async (item, e) => {
    e.preventDefault();
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];
    const file = e.target.files[0];
    if (validImageType.includes(file.type)) {
      const base64 = await convertToBase64(file);
      setNewQuestion({
        ...newQuestion,
        [item]: base64,
      });
    } else {
      dispatch(openSnackbar(true, "error", "Invalid Image Type"));
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await getSATquestions();
      console.log(
        "SAT Ques",
        data.map((item, index) => ({
          id: item?.id,
          question: item?.question,
          type: item?.types,
          optionType: "text",
          options: item?.options,
          correct: item?.options[Number(item?.answer)],
          marks: item?.marks,
        }))
      );
      // setQuestions(
      //   data.map((item, index) => (
      //     {
      //       id: item?.id,
      //       question: item?.question,
      //       type: item?.types,
      //       optionType: 'text',
      //       options: item?.options,
      //       correct: item?.options[Number(item?.answer)],
      //       marks:item?.marks
      //     }
      //   ))
      // )
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      style={{
        padding: "1rem",
      }}
    >
      <Grid container item xs={12} md={6} style={{ padding: "12px" }}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{
              borderBottom: "1px solid grey",
              marginBottom: "1rem",
              padbingBottom: "1rem",
            }}
          >
            Self Assessment Test
          </Typography>
          {questions?.map((item, index) =>
            item?.type === "objective" ? (
              <ObjectiveQuestion
                question={item}
                key={index}
                index={index + 1}
                deleteQuestion={() =>
                  setQuestions(questions.filter((q) => q.id !== item.id))
                }
              />
            ) : (
              <SubjectiveQuestion
                question={item}
                key={index}
                index={index + 1}
                deleteQuestion={() =>
                  setQuestions(questions.filter((q) => q.id !== item.id))
                }
              />
            )
          )}
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} style={{ padding: "12px" }}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{
              borderBottom: "1px solid grey",
              marginBottom: "1rem",
              padbingBottom: "1rem",
            }}
          >
            Configure
          </Typography>
          <Grid item xs={12} style={{ marginBottom: "12px" }}>
            {["objective", "subjective"].map((type, index) => (
              <Button
                style={{
                  border: `1px solid ${theme.BLUE}`,
                  borderRadius: 0,
                  backgroundColor:
                    type === newQuestion.type ? theme.BLUE : "white",
                  color: type === newQuestion.type ? "white" : theme.BLUE,
                }}
                onClick={() => setNewQuestion({ ...newQuestion, type })}
              >
                {type}
              </Button>
            ))}
          </Grid>
          <Grid container item xs={12} style={{ marginBottom: "12px" }}>
            <Grid container item xs={10} style={{ paddingRight: "8px" }}>
              <TextField
                label="Question"
                fullWidth
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid container item xs={2} style={{ paddingLeft: "8px" }}>
              <TextField
                label="Marks"
                fullWidth
                value={newQuestion.marks}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    marks: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>

          {newQuestion.type === "objective" && (
            <Grid container item xs={12}>
              <Grid
                container
                item
                xs={12}
                style={{
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    marginRight: "1rem",
                  }}
                >
                  Option Type
                </p>
                {["text", "image"].map((type, index) => (
                  <Button
                    style={{
                      border: `1px solid ${theme.BLUE}`,
                      borderRadius: 0,
                      backgroundColor:
                        type === newQuestion.optionType ? theme.BLUE : "white",
                      color:
                        type === newQuestion.optionType ? "white" : theme.BLUE,
                    }}
                    onClick={() =>
                      setNewQuestion({ ...newQuestion, optionType: type })
                    }
                  >
                    {type}
                  </Button>
                ))}
              </Grid>
              {newQuestion?.optionType === "text" &&
                ["A", "B", "C", "D"].map((item, index) => (
                  <Grid
                    container
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "8px",
                    }}
                    value={newQuestion[item]}
                  >
                    <TextField
                      label={`Option ${index + 1}`}
                      fullWidth
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          [item]: e.target.value,
                        })
                      }
                      value={newQuestion[item]}
                    />
                  </Grid>
                ))}

              {newQuestion?.optionType === "image" &&
                ["A", "B", "C", "D"].map((item, index) => (
                  <Grid
                    container
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "8px",
                    }}
                    value={newQuestion[item]}
                  >
                    <Input type="file" onChange={(e) => fileHandler(item, e)} />
                    {newQuestion[item] && (
                      <img
                        src={newQuestion[item]}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginLeft: "1rem",
                        }}
                        alt={item}
                      />
                    )}
                    {/* <TextField
                      label={`Option ${index + 1}`}
                      fullWidth
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          [item]: e.target.value,
                        })
                      }
                      value={newQuestion[item]}
                    /> */}
                  </Grid>
                ))}
              <Grid
                xs={12}
                style={{
                  marginBottom: "12px",
                  marginTop: "8px",
                }}
              >
                <FormControl fullWidth variant="filled">
                  <InputLabel>Correct Answer</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newQuestion?.correct}
                    label="Correct Answer"
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        correct: e.target.value,
                      })
                    }
                  >
                    {[
                      newQuestion?.A,
                      newQuestion?.B,
                      newQuestion?.C,
                      newQuestion?.D,
                    ].map((item, index) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          <Grid
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fff",
                color: "#0e4a7b",
                whiteSpace: "nowrap",
                height: "fit-content",
                border: "1px solid #0e4a7b",
                marginRight: "12px",
                padding: "12px 16px",
                width: "150px",
              }}
              onClick={() =>
                setNewQuestion({
                  id: Math.floor(Math.random() * 1111),
                  question: "",
                  type: "objective",
                  optionType: "text",
                  A: "",
                  B: "",
                  C: "",
                  D: "",
                  correct: "",
                  marks: "",
                })
              }
            >
              CANCEL
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#0e4a7b",
                color: "#FFF",
                whiteSpace: "nowrap",
                height: "fit-content",
                border: "1px solid #0e4a7b",
                marginLeft: "12px",
                padding: "12px 16px",
                width: "150px",
              }}
              onClick={addNewQuestion}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SATconfiguration;

function ObjectiveQuestion({ question, index, deleteQuestion }) {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        borderBottom: `2px solid ${theme.BLUE}`,
        padding: "12px",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Grid xs={7}>
        <p style={{ color: "grey", fontSize: "1.25rem", fontWeight: "bold" }}>
          {index}. {question?.question}
        </p>
      </Grid>
      <Grid xs={2}>
        <p
          style={{
            color: theme?.BLUE,
            fontSize: "1.25rem",
            fontWeight: "400",
          }}
        >
          Marks : <span>{question?.marks}</span>
        </p>
      </Grid>
      <Grid
        xs={3}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button style={{ marginRight: "12px" }}>
          <CreateIcon />
        </Button>
        <Button onClick={deleteQuestion}>
          <DeleteIcon />
        </Button>
      </Grid>
      {question?.options?.map((option, index) => (
        <Grid xs={12}>
          {question?.optionType === "text" ? (
            <p
              style={{
                fontSize: "18px",
                color: "grey",
                marginBottom: "8px",
              }}
            >
              {alphabeticalIndex[index]} . {option}
            </p>
          ) : (
            <>
              {alphabeticalIndex[index] + " . "}
              <img
                src={option}
                style={{ width: "50px", height: "50px", marginBottom: "12px" }}
                alt="option"
              />
            </>
          )}
        </Grid>
      ))}
      <Grid
        container
        item
        xs={12}
        style={{
          marginTop: "8px",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "grey",
          }}
        >
          Question Type{" "}
          <span
            style={{
              backgroundColor: "grey",
              color: "white",
              padding: "4px 12px",
              borderRadius: "4px",
              marginLeft: "8px",
            }}
          >
            {question?.type}
          </span>
        </p>

        <p
          style={{
            color: "grey",
          }}
        >
          Correct Answer
          {"      "}
          {question?.options?.map((option, index) => (
            <span
              style={{
                backgroundColor: option === question?.correct ? "grey" : "",
                color: option === question?.correct ? "white" : "grey",
                padding: "4px 12px",
              }}
            >
              {alphabeticalIndex[index]}
            </span>
          ))}
        </p>
      </Grid>
    </Grid>
  );
}

function SubjectiveQuestion({ question, index, deleteQuestion }) {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        borderBottom: `2px solid ${theme.BLUE}`,
        padding: "12px",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Grid xs={7}>
        <p style={{ color: "grey", fontSize: "1.25rem", fontWeight: "bold" }}>
          {index}. {question?.question}
        </p>
      </Grid>
      <Grid xs={2}>
        <p
          style={{
            color: theme?.BLUE,
            fontSize: "1.25rem",
            fontWeight: "400",
          }}
        >
          Marks : <span>{question?.marks}</span>
        </p>
      </Grid>
      <Grid
        xs={3}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button style={{ marginRight: "12px" }}>
          <CreateIcon />
        </Button>
        <Button onClick={deleteQuestion}>
          <DeleteIcon />
        </Button>
      </Grid>
      <Grid
        xs={12}
        style={{
          marginTop: "8px",
        }}
      >
        <p
          style={{
            color: "grey",
          }}
        >
          Question Type{" "}
          <span
            style={{
              backgroundColor: "grey",
              color: "white",
              padding: "4px 12px",
              borderRadius: "4px",
              marginLeft: "8px",
            }}
          >
            {question?.type}
          </span>
        </p>
      </Grid>
    </Grid>
  );
}
