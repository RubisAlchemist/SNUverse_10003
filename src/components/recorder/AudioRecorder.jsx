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

// // 버튼 없애기
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
// }) => {
//   const dispatch = useDispatch();
//   const current = useSelector((state) => state.aiConsult.audio.current);

//   const audioContextRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);
//   const isRecordingRef = useRef(false);
//   const animationIdRef = useRef(null); // To manage the animation frame

//   // Timers for debouncing
//   const voiceStartTimerRef = useRef(null);
//   const voiceStopTimerRef = useRef(null);

//   // Debounce durations in milliseconds
//   const VOICE_START_DEBOUNCE = 50; // Start recording after 500ms of voice
//   const VOICE_STOP_DEBOUNCE = 1000; // Stop recording after 2000ms of silence

//   // Flag to prevent multiple uploads
//   const isUploadingRef = useRef(false);

//   // State for volume visualization and error messages
//   const [volume, setVolume] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isComponentMounted = true;
//     let analyser = null;
//     let dataArray = null;

//     // Check for Web Audio API support
//     if (!window.AudioContext && !window.webkitAudioContext) {
//       console.error("이 브라우저는 Web Audio API를 지원하지 않습니다.");
//       setError("Web Audio API를 지원하지 않는 브라우저입니다.");
//       return;
//     }

//     // Request microphone access
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         console.log("Obtained stream:", stream);
//         console.log(
//           "Is stream an instance of MediaStream?",
//           stream instanceof MediaStream
//         );

//         if (!isComponentMounted) return;

//         // Initialize AudioContext
//         audioContextRef.current = new (window.AudioContext ||
//           window.webkitAudioContext)();

//         // Create a MediaStreamAudioSourceNode
//         const sourceNode =
//           audioContextRef.current.createMediaStreamSource(stream);

//         // Create an AnalyserNode for audio processing
//         analyser = audioContextRef.current.createAnalyser();
//         analyser.fftSize = 512; // Frequency domain analysis size
//         sourceNode.connect(analyser);
//         dataArray = new Uint8Array(analyser.fftSize);

//         // Initialize MediaRecorder for recording audio
//         mediaRecorderRef.current = new MediaRecorder(stream, {
//           mimeType: "audio/webm",
//         });

//         // Handle data availability
//         mediaRecorderRef.current.ondataavailable = (event) => {
//           chunksRef.current.push(event.data);
//         };

//         // Handle recording stop event
//         mediaRecorderRef.current.onstop = handleRecordingStop;

//         // Voice Activity Detection (VAD) based on volume threshold with debounce
//         const detectVoice = () => {
//           analyser.getByteTimeDomainData(dataArray);
//           let sum = 0;
//           for (let i = 0; i < dataArray.length; i++) {
//             const sample = dataArray[i] - 128;
//             sum += sample * sample;
//           }
//           const rms = Math.sqrt(sum / dataArray.length);
//           const currentVolume = rms / 128;

//           // Update the volume state for visualization
//           setVolume(currentVolume);

//           // Log the computed volume for debugging
//           // console.log(`Computed Volume: ${currentVolume}`);

//           // Define a threshold for voice activity
//           const threshold = 0.05; // Adjust based on testing

//           if (currentVolume > threshold) {
//             // If voice is detected, reset the stop timer
//             if (voiceStopTimerRef.current) {
//               clearTimeout(voiceStopTimerRef.current);
//               voiceStopTimerRef.current = null;
//             }

//             // Start the start timer if not already recording
//             if (!isRecordingRef.current && !voiceStartTimerRef.current) {
//               voiceStartTimerRef.current = setTimeout(() => {
//                 startRecording();
//                 voiceStartTimerRef.current = null;
//               }, VOICE_START_DEBOUNCE);
//             }
//           } else {
//             // If silence is detected, reset the start timer
//             if (voiceStartTimerRef.current) {
//               clearTimeout(voiceStartTimerRef.current);
//               voiceStartTimerRef.current = null;
//             }

//             // Start the stop timer if recording
//             if (isRecordingRef.current && !voiceStopTimerRef.current) {
//               voiceStopTimerRef.current = setTimeout(() => {
//                 stopRecording();
//                 voiceStopTimerRef.current = null;
//               }, VOICE_STOP_DEBOUNCE);
//             }
//           }

//           // Continue the loop
//           animationIdRef.current = requestAnimationFrame(detectVoice);
//         };

//         // Start voice detection
//         detectVoice();
//       })
//       .catch((err) => {
//         console.error("마이크 접근 에러:", err);
//         setError(
//           "마이크 접근이 필요합니다. 설정에서 마이크 권한을 허용해주세요."
//         );
//         alert("마이크 접근이 필요합니다. 설정에서 마이크 권한을 허용해주세요.");
//       });

//     // Cleanup function to run when the component unmounts
//     return () => {
//       isComponentMounted = false;

//       // Cancel the animation frame to stop VAD
//       if (animationIdRef.current) {
//         cancelAnimationFrame(animationIdRef.current);
//       }

//       // Clear any pending timers
//       if (voiceStartTimerRef.current) {
//         clearTimeout(voiceStartTimerRef.current);
//       }
//       if (voiceStopTimerRef.current) {
//         clearTimeout(voiceStopTimerRef.current);
//       }

//       // Close the AudioContext to release resources
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }

//       // Stop the MediaRecorder if it's active
//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state !== "inactive"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, []);

//   // Function to start recording
//   const startRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "inactive"
//     ) {
//       mediaRecorderRef.current.start();
//       isRecordingRef.current = true;
//       console.log("녹음 시작");
//       if (onRecordingStart) {
//         onRecordingStart();
//       }
//     }
//   };

//   // Function to stop recording
//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       isRecordingRef.current = false;
//       console.log("녹음 종료");
//     }
//   };

//   // Function to handle recording stop event
//   const handleRecordingStop = () => {
//     if (isUploadingRef.current) {
//       console.warn("이미 업로드 중입니다. 새로운 업로드를 시작하지 않습니다.");
//       return;
//     }

//     const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//     chunksRef.current = [];

//     const requestSentTime = Date.now();
//     if (onRecordingStop) {
//       onRecordingStop(requestSentTime);
//     }

//     // Log the blob details for debugging
//     console.log("Recorded Blob:", blob);
//     console.log("Blob size:", blob.size);
//     console.log("Blob type:", blob.type);

//     // Prepare form data for server upload
//     const formData = new FormData();
//     formData.append("audio", blob, `${uname}_audio_${current}.webm`);
//     formData.append("uname", uname);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("selectedAvatar", selectedAvatar);

//     // Debug: Log FormData entries
//     for (let pair of formData.entries()) {
//       if (pair[0] === "audio") {
//         console.log(`${pair[0]}: [Blob with size ${pair[1].size}]`);
//       } else {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }
//     }

//     // Prevent multiple uploads
//     isUploadingRef.current = true;

//     // Dispatch Redux actions
//     dispatch(clearAudioSrc());
//     dispatch(uploadRequest(formData))
//       .unwrap()
//       .then((response) => {
//         console.log("업로드 성공:", response);
//         // Handle successful upload if needed
//       })
//       .catch((error) => {
//         console.error("업로드 실패:", error);
//         // Optionally, provide user feedback about the failure
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
//           backgroundColor: "green",
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

const AudioRecorder = ({
  uname,
  phoneNumber,
  selectedAvatar,
  onRecordingStart,
  onRecordingStop,
  isRecordingAllowed, // New prop
}) => {
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

  useEffect(() => {
    let isComponentMounted = true;
    let analyser = null;
    let dataArray = null;

    if (!window.AudioContext && !window.webkitAudioContext) {
      console.error("This browser does not support Web Audio API.");
      setError("Your browser does not support Web Audio API.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (!isComponentMounted) return;

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

        const detectVoice = () => {
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
        };

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

    return () => {
      isComponentMounted = false;

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (voiceStartTimerRef.current) {
        clearTimeout(voiceStartTimerRef.current);
      }
      if (voiceStopTimerRef.current) {
        clearTimeout(voiceStopTimerRef.current);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecordingAllowed]); // Add isRecordingAllowed to dependencies

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
    <div>
      {/* Volume Meter */}
      <div
        style={{
          width: `${volume * 100}%`,
          height: "10px",
          backgroundColor: isRecordingAllowed ? "green" : "gray",
          transition: "width 0.1s",
          marginTop: "10px",
        }}
      ></div>

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
