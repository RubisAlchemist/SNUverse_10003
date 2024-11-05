// // // 클레온 아바타 하단바 디자인 적용 버전

// import { Button, Typography } from "@mui/material";
// import {
//   clearAudioSrc,
//   uploadRequest,
//   setNotePlaying,
// } from "@store/ai/aiConsultSlice";
// import PropTypes from "prop-types";
// import { useReactMediaRecorder } from "react-media-recorder";
// import { useDispatch, useSelector } from "react-redux";

// // Icon import
// import Mic from "@assets/images/mic_blue.png";
// import Pause from "@assets/images/pause_blue.png";

// // for profiling
// function saveTimestampsToCSV(timestamps) {
//   const fields = ["requestSentTime", "firstVideoPlayedTime"];
//   // Create CSV header and content
//   const csvRows = [];
//   csvRows.push(fields.join(",")); // Add header
//   csvRows.push(
//     [timestamps.requestSentTime, timestamps.firstVideoPlayedTime].join(",")
//   ); // Add row
//   // Convert CSV array to a Blob
//   const csvContent = csvRows.join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv" });
//   // Create a downloadable link for the CSV
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "timestamps_profiling_0911_requestSent.csv";
//   // Programmatically click the link to trigger the download
//   document.body.appendChild(link);
//   link.click();
//   // Cleanup
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);
// }
// //

// const AudioRecorder = ({
//   uname,
//   phoneNumber,
//   selectedAvatar,
//   disabled,
//   onRecordingStart,
// }) => {
//   const current = useSelector((state) => state.aiConsult.audio.current);
//   const dispatch = useDispatch();

//   const { status, startRecording, stopRecording } = useReactMediaRecorder({
//     audio: true,
//     blobPropertyBag: {
//       type: "audio/wav",
//     },
//     onStart: () => {
//       console.log(`[RECORDER] audio record start = ${status}`);
//       onRecordingStart();
//     },
//     onStop: async (url, blob) => {
//       const requestSentTime = Date.now(); // profiling
//       const timestamps = { requestSentTime, firstVideoPlayedTime: -1 };
//       // saveTimestampsToCSV(timestamps);
//       console.log("대답끝내기: ", requestSentTime);
//       console.log("[RECORDER] audio record stop");
//       console.log(blob);

//       const formData = new FormData();
//       formData.append("audio", blob, `${uname}_audio_${current}.wav`);
//       formData.append("uname", uname);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("selectedAvatar", selectedAvatar);
//       console.log(formData.get("audio"));
//       console.log(formData.get("uname"));
//       console.log(formData.get("phoneNumber"));
//       console.log(formData.get("selectedAvatar"));

//       dispatch(clearAudioSrc());
//       dispatch(uploadRequest(formData));
//       dispatch(setNotePlaying());
//     },
//   });

//   return (
//     <>
//       {status === "recording" ? (
//         <Button
//           onClick={stopRecording}
//           disabled={disabled}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//             // width: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },  // 반응형 너비
//             height: { xs: "30px", sm: "40px", md: "50px", lg: "60px" }, // 반응형 높이
//           }}
//         >
//           <img
//             src={Pause}
//             alt="pause icon"
//             style={{
//               width: "auto", // 부모 버튼의 크기에 맞춰 이미지 크기 조정
//               height: "100%",
//             }}
//           />
//           <Typography
//             sx={{
//               fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" }, // 반응형 폰트 크기
//               fontWeight: "800",
//             }}
//           >
//             말 끝내기
//           </Typography>
//         </Button>
//       ) : (
//         <Button
//           onClick={startRecording}
//           disabled={disabled}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//             // width: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },  // 반응형 너비
//             height: { xs: "30px", sm: "40px", md: "50px", lg: "60px" }, // 반응형 높이
//           }}
//         >
//           <img
//             src={Mic}
//             alt="mic icon"
//             style={{
//               width: "auto", // 부모 버튼의 크기에 맞춰 이미지 크기 조정
//               height: "100%",
//             }}
//           />
//           <Typography
//             sx={{
//               fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" }, // 반응형 폰트 크기
//               fontWeight: "800",
//             }}
//           >
//             말 시작하기
//           </Typography>
//         </Button>
//       )}
//     </>
//   );
// };

// AudioRecorder.propTypes = {
//   uname: PropTypes.string,
//   phoneNumber: PropTypes.string,
//   selectedAvatar: PropTypes.string,
//   disabled: PropTypes.bool,
//   onRecordingStart: PropTypes.func,
// };

// export default AudioRecorder;

// import { Button, Typography } from "@mui/material";
// import {
//   clearAudioSrc,
//   uploadRequest,
//   setNotePlaying,
// } from "@store/ai/aiConsultSlice";
// import PropTypes from "prop-types";
// import { useReactMediaRecorder } from "react-media-recorder";
// import { useDispatch, useSelector } from "react-redux";

// // Icon import
// import Mic from "@assets/images/mic_blue.png";
// import Pause from "@assets/images/pause_blue.png";

// const AudioRecorder = ({
//   uname,
//   phoneNumber,
//   selectedAvatar,
//   disabled,
//   onRecordingStart,
//   onRecordingStop, // 추가된 부분
// }) => {
//   const current = useSelector((state) => state.aiConsult.audio.current);
//   const dispatch = useDispatch();

//   const { status, startRecording, stopRecording } = useReactMediaRecorder({
//     audio: true,
//     blobPropertyBag: {
//       type: "audio/wav",
//     },
//     onStart: () => {
//       console.log(`[RECORDER] audio record start = ${status}`);
//       onRecordingStart();
//     },
//     onStop: async (url, blob) => {
//       const requestSentTime = Date.now(); // 타임스탬프 기록
//       console.log("대답끝내기: ", requestSentTime);
//       console.log("[RECORDER] audio record stop");
//       console.log(blob);

//       // onRecordingStop 콜백 호출
//       if (onRecordingStop) {
//         onRecordingStop(requestSentTime);
//       }

//       const formData = new FormData();
//       formData.append("audio", blob, `${uname}_audio_${current}.wav`);
//       formData.append("uname", uname);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("selectedAvatar", selectedAvatar);
//       console.log(formData.get("audio"));
//       console.log(formData.get("uname"));
//       console.log(formData.get("phoneNumber"));
//       console.log(formData.get("selectedAvatar"));

//       dispatch(clearAudioSrc());
//       dispatch(uploadRequest(formData));
//       dispatch(setNotePlaying());
//     },
//   });

//   return (
//     <>
//       {status === "recording" ? (
//         <Button
//           onClick={stopRecording}
//           disabled={disabled}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//             // width: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },  // 반응형 너비
//             height: { xs: "30px", sm: "40px", md: "50px", lg: "60px" }, // 반응형 높이
//           }}
//         >
//           <img
//             src={Pause}
//             alt="pause icon"
//             style={{
//               width: "auto", // 부모 버튼의 크기에 맞춰 이미지 크기 조정
//               height: "100%",
//             }}
//           />
//           <Typography
//             sx={{
//               fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" }, // 반응형 폰트 크기
//               fontWeight: "800",
//             }}
//           >
//             말 끝내기
//           </Typography>
//         </Button>
//       ) : (
//         <Button
//           onClick={startRecording}
//           disabled={disabled}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//             // width: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },  // 반응형 너비
//             height: { xs: "30px", sm: "40px", md: "50px", lg: "60px" }, // 반응형 높이
//           }}
//         >
//           <img
//             src={Mic}
//             alt="mic icon"
//             style={{
//               width: "auto", // 부모 버튼의 크기에 맞춰 이미지 크기 조정
//               height: "100%",
//             }}
//           />
//           <Typography
//             sx={{
//               fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" }, // 반응형 폰트 크기
//               fontWeight: "800",
//             }}
//           >
//             말 시작하기
//           </Typography>
//         </Button>
//       )}
//     </>
//   );
// };

// AudioRecorder.propTypes = {
//   uname: PropTypes.string,
//   phoneNumber: PropTypes.string,
//   selectedAvatar: PropTypes.string,
//   disabled: PropTypes.bool,
//   onRecordingStart: PropTypes.func,
//   onRecordingStop: PropTypes.func, // 추가된 부분
// };

// // export default AudioRecorder;

// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearAudioSrc,
//   uploadRequest,
//   setNotePlaying,
// } from "@store/ai/aiConsultSlice";
// import PropTypes from "prop-types";

// const AudioRecorder = ({
//   uname,
//   phoneNumber,
//   selectedAvatar,
//   onRecordingStart,
//   onRecordingStop,
//   isRecordingAllowed, // New prop
// }) => {
//   const dispatch = useDispatch();
//   const current = useSelector((state) => state.aiConsult.audio.current);

//   const audioContextRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);
//   const isRecordingRef = useRef(false);
//   const animationIdRef = useRef(null);

//   const voiceStartTimerRef = useRef(null);
//   const voiceStopTimerRef = useRef(null);

//   const VOICE_START_DEBOUNCE = 50;
//   const VOICE_STOP_DEBOUNCE = 1000;

//   const isUploadingRef = useRef(false);

//   const [volume, setVolume] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isComponentMounted = true;
//     let analyser = null;
//     let dataArray = null;

//     if (!window.AudioContext && !window.webkitAudioContext) {
//       console.error("This browser does not support Web Audio API.");
//       setError("Your browser does not support Web Audio API.");
//       return;
//     }

//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         if (!isComponentMounted) return;

//         audioContextRef.current = new (window.AudioContext ||
//           window.webkitAudioContext)();

//         const sourceNode =
//           audioContextRef.current.createMediaStreamSource(stream);

//         analyser = audioContextRef.current.createAnalyser();
//         analyser.fftSize = 512;
//         sourceNode.connect(analyser);
//         dataArray = new Uint8Array(analyser.fftSize);

//         mediaRecorderRef.current = new MediaRecorder(stream, {
//           mimeType: "audio/webm",
//         });

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           chunksRef.current.push(event.data);
//         };

//         mediaRecorderRef.current.onstop = handleRecordingStop;

//         const detectVoice = () => {
//           analyser.getByteTimeDomainData(dataArray);
//           let sum = 0;
//           for (let i = 0; i < dataArray.length; i++) {
//             const sample = dataArray[i] - 128;
//             sum += sample * sample;
//           }
//           const rms = Math.sqrt(sum / dataArray.length);
//           const currentVolume = rms / 128;

//           setVolume(currentVolume);

//           const threshold = 0.05;

//           if (!isRecordingAllowed) {
//             if (isRecordingRef.current) {
//               stopRecording();
//             }
//             animationIdRef.current = requestAnimationFrame(detectVoice);
//             return;
//           }

//           if (currentVolume > threshold) {
//             if (voiceStopTimerRef.current) {
//               clearTimeout(voiceStopTimerRef.current);
//               voiceStopTimerRef.current = null;
//             }

//             if (!isRecordingRef.current && !voiceStartTimerRef.current) {
//               voiceStartTimerRef.current = setTimeout(() => {
//                 startRecording();
//                 voiceStartTimerRef.current = null;
//               }, VOICE_START_DEBOUNCE);
//             }
//           } else {
//             if (voiceStartTimerRef.current) {
//               clearTimeout(voiceStartTimerRef.current);
//               voiceStartTimerRef.current = null;
//             }

//             if (isRecordingRef.current && !voiceStopTimerRef.current) {
//               voiceStopTimerRef.current = setTimeout(() => {
//                 stopRecording();
//                 voiceStopTimerRef.current = null;
//               }, VOICE_STOP_DEBOUNCE);
//             }
//           }

//           animationIdRef.current = requestAnimationFrame(detectVoice);
//         };

//         detectVoice();
//       })
//       .catch((err) => {
//         console.error("Microphone access error:", err);
//         setError(
//           "Microphone access is required. Please allow microphone permissions in your settings."
//         );
//         alert(
//           "Microphone access is required. Please allow microphone permissions in your settings."
//         );
//       });

//     return () => {
//       isComponentMounted = false;

//       if (animationIdRef.current) {
//         cancelAnimationFrame(animationIdRef.current);
//       }

//       if (voiceStartTimerRef.current) {
//         clearTimeout(voiceStartTimerRef.current);
//       }
//       if (voiceStopTimerRef.current) {
//         clearTimeout(voiceStopTimerRef.current);
//       }

//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }

//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state !== "inactive"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, [isRecordingAllowed]); // Add isRecordingAllowed to dependencies

//   useEffect(() => {
//     if (!isRecordingAllowed && isRecordingRef.current) {
//       stopRecording();
//     }
//   }, [isRecordingAllowed]);

//   const startRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "inactive"
//     ) {
//       mediaRecorderRef.current.start();
//       isRecordingRef.current = true;
//       console.log("Recording started");
//       if (onRecordingStart) {
//         onRecordingStart();
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       isRecordingRef.current = false;
//       console.log("Recording stopped");
//     }
//   };

//   const handleRecordingStop = () => {
//     if (isUploadingRef.current) {
//       console.warn("Already uploading. Not starting a new upload.");
//       return;
//     }

//     const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//     chunksRef.current = [];

//     const requestSentTime = Date.now();
//     if (onRecordingStop) {
//       onRecordingStop(requestSentTime);
//     }

//     const formData = new FormData();
//     formData.append("audio", blob, `${uname}_audio_${current}.webm`);
//     formData.append("uname", uname);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("selectedAvatar", selectedAvatar);

//     isUploadingRef.current = true;

//     dispatch(clearAudioSrc());
//     dispatch(uploadRequest(formData))
//       .unwrap()
//       .then((response) => {
//         console.log("Upload successful:", response);
//       })
//       .catch((error) => {
//         console.error("Upload failed:", error);
//       })
//       .finally(() => {
//         isUploadingRef.current = false;
//       });

//     dispatch(setNotePlaying());
//   };

//   return (
//     <div>
//       {/* Volume Meter */}
//       <div
//         style={{
//           width: `${volume * 100}%`,
//           height: "10px",
//           backgroundColor: isRecordingAllowed ? "green" : "gray",
//           transition: "width 0.1s",
//           marginTop: "10px",
//         }}
//       ></div>

//       {/* Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// AudioRecorder.propTypes = {
//   uname: PropTypes.string.isRequired,
//   phoneNumber: PropTypes.string.isRequired,
//   selectedAvatar: PropTypes.string.isRequired,
//   onRecordingStart: PropTypes.func,
//   onRecordingStop: PropTypes.func,
//   isRecordingAllowed: PropTypes.bool.isRequired,
// };

// export default AudioRecorder;

// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearAudioSrc,
//   uploadRequest,
//   setNotePlaying,
// } from "@store/ai/aiConsultSlice";
// import PropTypes from "prop-types";

// // Import MUI components and icons
// import { makeStyles } from "@mui/styles";
// import GraphicEqIcon from "@mui/icons-material/GraphicEq";
// import MicOffIcon from "@mui/icons-material/MicOff";

// const useStyles = makeStyles({
//   icon: {
//     fontSize: 70,
//     transition: "transform 0.1s",
//   },
//   animate: {
//     animation: "$pulse 1s infinite",
//   },
//   "@keyframes pulse": {
//     "0%": {
//       transform: "scale(1)",
//     },
//     "50%": {
//       transform: "scale(1.2)",
//     },
//     "100%": {
//       transform: "scale(1)",
//     },
//   },
// });

// const AudioRecorder = ({
//   uname,
//   phoneNumber,
//   selectedAvatar,
//   onRecordingStart,
//   onRecordingStop,
//   isRecordingAllowed,
// }) => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const current = useSelector((state) => state.aiConsult.audio.current);

//   const audioContextRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);
//   const isRecordingRef = useRef(false);
//   const animationIdRef = useRef(null);

//   const voiceStartTimerRef = useRef(null);
//   const voiceStopTimerRef = useRef(null);

//   const VOICE_START_DEBOUNCE = 50;
//   const VOICE_STOP_DEBOUNCE = 1000;

//   const isUploadingRef = useRef(false);

//   const [volume, setVolume] = useState(0);
//   const [error, setError] = useState(null);

//   const [isRecording, setIsRecording] = useState(false);

//   const getRecordingStatusMessage = () => {
//     if (!isRecordingAllowed) return;
//     if (isRecording) return;
//     return "상담사에게 말씀해주세요";
//   };

//   useEffect(() => {
//     let isComponentMounted = true;
//     let analyser = null;
//     let dataArray = null;

//     if (!window.AudioContext && !window.webkitAudioContext) {
//       console.error("This browser does not support Web Audio API.");
//       setError("Your browser does not support Web Audio API.");
//       return;
//     }

//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         if (!isComponentMounted) return;

//         audioContextRef.current = new (window.AudioContext ||
//           window.webkitAudioContext)();

//         const sourceNode =
//           audioContextRef.current.createMediaStreamSource(stream);

//         analyser = audioContextRef.current.createAnalyser();
//         analyser.fftSize = 512;
//         sourceNode.connect(analyser);
//         dataArray = new Uint8Array(analyser.fftSize);

//         mediaRecorderRef.current = new MediaRecorder(stream, {
//           mimeType: "audio/webm",
//         });

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           chunksRef.current.push(event.data);
//         };

//         mediaRecorderRef.current.onstop = handleRecordingStop;

//         const detectVoice = () => {
//           analyser.getByteTimeDomainData(dataArray);
//           let sum = 0;
//           for (let i = 0; i < dataArray.length; i++) {
//             const sample = dataArray[i] - 128;
//             sum += sample * sample;
//           }
//           const rms = Math.sqrt(sum / dataArray.length);
//           const currentVolume = rms / 128;

//           setVolume(currentVolume);

//           const threshold = 0.05;

//           if (!isRecordingAllowed) {
//             if (isRecordingRef.current) {
//               stopRecording();
//             }
//             setIsRecording(false);
//             animationIdRef.current = requestAnimationFrame(detectVoice);
//             return;
//           }

//           if (currentVolume > threshold) {
//             if (voiceStopTimerRef.current) {
//               clearTimeout(voiceStopTimerRef.current);
//               voiceStopTimerRef.current = null;
//             }

//             if (!isRecordingRef.current && !voiceStartTimerRef.current) {
//               voiceStartTimerRef.current = setTimeout(() => {
//                 startRecording();
//                 voiceStartTimerRef.current = null;
//               }, VOICE_START_DEBOUNCE);
//             }
//           } else {
//             if (voiceStartTimerRef.current) {
//               clearTimeout(voiceStartTimerRef.current);
//               voiceStartTimerRef.current = null;
//             }

//             if (isRecordingRef.current && !voiceStopTimerRef.current) {
//               voiceStopTimerRef.current = setTimeout(() => {
//                 stopRecording();
//                 voiceStopTimerRef.current = null;
//               }, VOICE_STOP_DEBOUNCE);
//             }
//           }

//           animationIdRef.current = requestAnimationFrame(detectVoice);
//         };

//         detectVoice();
//       })
//       .catch((err) => {
//         console.error("Microphone access error:", err);
//         setError(
//           "Microphone access is required. Please allow microphone permissions in your settings."
//         );
//         alert(
//           "Microphone access is required. Please allow microphone permissions in your settings."
//         );
//       });

//     return () => {
//       isComponentMounted = false;

//       if (animationIdRef.current) {
//         cancelAnimationFrame(animationIdRef.current);
//       }

//       if (voiceStartTimerRef.current) {
//         clearTimeout(voiceStartTimerRef.current);
//       }
//       if (voiceStopTimerRef.current) {
//         clearTimeout(voiceStopTimerRef.current);
//       }

//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }

//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state !== "inactive"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, [isRecordingAllowed]);

//   useEffect(() => {
//     if (!isRecordingAllowed && isRecordingRef.current) {
//       stopRecording();
//     }
//   }, [isRecordingAllowed]);

//   const startRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "inactive"
//     ) {
//       mediaRecorderRef.current.start();
//       isRecordingRef.current = true;
//       setIsRecording(true);
//       console.log("Recording started");
//       if (onRecordingStart) {
//         onRecordingStart();
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       isRecordingRef.current = false;
//       setIsRecording(false);
//       console.log("Recording stopped");
//     }
//   };

//   const handleRecordingStop = () => {
//     if (isUploadingRef.current) {
//       console.warn("Already uploading. Not starting a new upload.");
//       return;
//     }

//     const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//     chunksRef.current = [];

//     const requestSentTime = Date.now();
//     if (onRecordingStop) {
//       onRecordingStop(requestSentTime);
//     }

//     const formData = new FormData();
//     formData.append("audio", blob, `${uname}_audio_${current}.webm`);
//     formData.append("uname", uname);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("selectedAvatar", selectedAvatar);

//     isUploadingRef.current = true;

//     dispatch(clearAudioSrc());
//     dispatch(uploadRequest(formData))
//       .unwrap()
//       .then((response) => {
//         console.log("Upload successful:", response);
//       })
//       .catch((error) => {
//         console.error("Upload failed:", error);
//       })
//       .finally(() => {
//         isUploadingRef.current = false;
//       });

//     dispatch(setNotePlaying());
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "10px" }}>
//       {/* Recording Icon */}
//       {!isRecordingAllowed ? (
//         <MicOffIcon className={classes.icon} style={{ color: "gray" }} />
//       ) : (
//         <GraphicEqIcon
//           className={`${classes.icon} ${isRecording ? classes.animate : ""}`}
//           style={{ color: isRecording ? "#4caf50" : "gray" }}
//         />
//       )}
//       <p
//         style={{
//           marginTop: "0px",
//           fontSize: "23px",
//           color: isRecording ? "#4caf50" : "gray",
//         }}
//       >
//         {getRecordingStatusMessage()}
//       </p>

//       {/* Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// AudioRecorder.propTypes = {
//   uname: PropTypes.string.isRequired,
//   phoneNumber: PropTypes.string.isRequired,
//   selectedAvatar: PropTypes.string.isRequired,
//   onRecordingStart: PropTypes.func,
//   onRecordingStop: PropTypes.func,
//   isRecordingAllowed: PropTypes.bool.isRequired,
// };

// export default AudioRecorder;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAudioSrc,
  uploadRequest,
  setNotePlaying,
} from "@store/ai/aiConsultSlice";
import PropTypes from "prop-types";

// Import MUI components and icons
import { makeStyles } from "@mui/styles";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import MicOffIcon from "@mui/icons-material/MicOff";

const useStyles = makeStyles({
  icon: {
    fontSize: 70,
    transition: "transform 0.1s",
  },
  animate: {
    animation: "$pulse 1s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
});

const AudioRecorder = ({
  uname,
  phoneNumber,
  selectedAvatar,
  onRecordingStart,
  onRecordingStop,
  isRecordingAllowed,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const current = useSelector((state) => state.aiConsult.audio.current);

  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const isRecordingRef = useRef(false);
  const animationIdRef = useRef(null);

  const voiceStartTimerRef = useRef(null);
  const voiceStopTimerRef = useRef(null);

  const VOICE_START_DEBOUNCE = 50;
  const VOICE_STOP_DEBOUNCE = 1000;

  const isUploadingRef = useRef(false);

  const [volume, setVolume] = useState(0);
  const [error, setError] = useState(null);

  const [isRecording, setIsRecording] = useState(false);

  const getRecordingStatusMessage = () => {
    if (!isRecordingAllowed) return;
    if (isRecording) return;
    return "상담사에게 말씀해주세요";
  };

  useEffect(() => {
    let isComponentMounted = true;
    let analyser = null;
    let dataArray = null;
    let stream = null;

    const initializeMedia = () => {
      if (!isComponentMounted) return;

      if (!window.AudioContext && !window.webkitAudioContext) {
        console.error("This browser does not support Web Audio API.");
        setError("Your browser does not support Web Audio API.");
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((mediaStream) => {
          if (!isComponentMounted) return;

          stream = mediaStream;

          // Listen for device change events
          stream.getTracks().forEach((track) => {
            track.onended = () => {
              console.log("Media stream track ended");
              // Reinitialize media when the track ends
              if (isComponentMounted) {
                cleanupMedia();
                initializeMedia();
              }
            };
          });

          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();

          const sourceNode =
            audioContextRef.current.createMediaStreamSource(stream);

          analyser = audioContextRef.current.createAnalyser();
          analyser.fftSize = 512;
          sourceNode.connect(analyser);
          dataArray = new Uint8Array(analyser.fftSize);

          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "audio/webm",
          });

          mediaRecorderRef.current.ondataavailable = (event) => {
            chunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = handleRecordingStop;

          detectVoice();
        })
        .catch((err) => {
          console.error("Microphone access error:", err);
          setError(
            "Microphone access is required. Please allow microphone permissions in your settings."
          );
          alert(
            "Microphone access is required. Please allow microphone permissions in your settings."
          );
        });
    };

    const cleanupMedia = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (voiceStartTimerRef.current) {
        clearTimeout(voiceStartTimerRef.current);
        voiceStartTimerRef.current = null;
      }
      if (voiceStopTimerRef.current) {
        clearTimeout(voiceStopTimerRef.current);
        voiceStopTimerRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        stream = null;
      }

      isRecordingRef.current = false;
      setIsRecording(false);
    };

    const detectVoice = () => {
      try {
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const sample = dataArray[i] - 128;
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        const currentVolume = rms / 128;

        setVolume(currentVolume);

        const threshold = 0.05;

        if (!isRecordingAllowed) {
          if (isRecordingRef.current) {
            stopRecording();
          }
          setIsRecording(false);
          animationIdRef.current = requestAnimationFrame(detectVoice);
          return;
        }

        if (currentVolume > threshold) {
          if (voiceStopTimerRef.current) {
            clearTimeout(voiceStopTimerRef.current);
            voiceStopTimerRef.current = null;
          }

          if (!isRecordingRef.current && !voiceStartTimerRef.current) {
            voiceStartTimerRef.current = setTimeout(() => {
              startRecording();
              voiceStartTimerRef.current = null;
            }, VOICE_START_DEBOUNCE);
          }
        } else {
          if (voiceStartTimerRef.current) {
            clearTimeout(voiceStartTimerRef.current);
            voiceStartTimerRef.current = null;
          }

          if (isRecordingRef.current && !voiceStopTimerRef.current) {
            voiceStopTimerRef.current = setTimeout(() => {
              stopRecording();
              voiceStopTimerRef.current = null;
            }, VOICE_STOP_DEBOUNCE);
          }
        }

        animationIdRef.current = requestAnimationFrame(detectVoice);
      } catch (error) {
        console.error("Error in detectVoice:", error);
        // Reinitialize media on error
        if (isComponentMounted) {
          cleanupMedia();
          initializeMedia();
        }
      }
    };

    initializeMedia();

    return () => {
      isComponentMounted = false;
      cleanupMedia();
    };
  }, [isRecordingAllowed]);

  useEffect(() => {
    if (!isRecordingAllowed && isRecordingRef.current) {
      stopRecording();
    }
  }, [isRecordingAllowed]);

  const startRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "inactive"
    ) {
      mediaRecorderRef.current.start();
      isRecordingRef.current = true;
      setIsRecording(true);
      console.log("Recording started");
      if (onRecordingStart) {
        onRecordingStart();
      }
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      isRecordingRef.current = false;
      setIsRecording(false);
      console.log("Recording stopped");
    }
  };

  const handleRecordingStop = () => {
    if (isUploadingRef.current) {
      console.warn("Already uploading. Not starting a new upload.");
      return;
    }

    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    chunksRef.current = [];

    const requestSentTime = Date.now();
    if (onRecordingStop) {
      onRecordingStop(requestSentTime);
    }

    const formData = new FormData();
    formData.append("audio", blob, `${uname}_audio_${current}.webm`);
    formData.append("uname", uname);
    formData.append("phoneNumber", phoneNumber);
    formData.append("selectedAvatar", selectedAvatar);

    isUploadingRef.current = true;

    dispatch(clearAudioSrc());
    dispatch(uploadRequest(formData))
      .unwrap()
      .then((response) => {
        console.log("Upload successful:", response);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      })
      .finally(() => {
        isUploadingRef.current = false;
      });

    dispatch(setNotePlaying());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      {/* Recording Icon */}
      {!isRecordingAllowed ? (
        <MicOffIcon className={classes.icon} style={{ color: "gray" }} />
      ) : (
        <GraphicEqIcon
          className={`${classes.icon} ${isRecording ? classes.animate : ""}`}
          style={{ color: isRecording ? "#4caf50" : "gray" }}
        />
      )}
      <p
        style={{
          marginTop: "0px",
          fontSize: "23px",
          color: isRecording ? "#4caf50" : "gray",
        }}
      >
        {getRecordingStatusMessage()}
      </p>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

AudioRecorder.propTypes = {
  uname: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  selectedAvatar: PropTypes.string.isRequired,
  onRecordingStart: PropTypes.func,
  onRecordingStop: PropTypes.func,
  isRecordingAllowed: PropTypes.bool.isRequired,
};

export default AudioRecorder;
