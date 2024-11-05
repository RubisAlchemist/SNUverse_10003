// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   AudioRecorder,
//   LocalUser,
//   SeamlessVideoPlayer,
// } from "@components/index";
// import { Button, Box, Fade, CircularProgress } from "@mui/material";
// import {
//   clearAudioSrc,
//   setGreetingsPlayed,
//   setNotePlaying,
//   clearNotePlaying,
//   setErrorPlaying,
//   clearErrorPlaying,
// } from "@store/ai/aiConsultSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// // 아이콘 및 이미지 임포트
// import Exit from "@assets/images/exit.png";
// import Describe1Image from "@assets/images/describe1.png";
// import Describe2Image from "@assets/images/describe2.png";
// import BackgroundImage_sonny from "@assets/images/background_sonny.png";
// import BackgroundImage_karina from "@assets/images/background_karina.png";
// import BackgroundImage_chloe from "@assets/images/background_chloe.png";
// import BackgroundImage_dohyung from "@assets/images/background_dohyung.png";

// // SweetAlert2 임포트
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const AiConsultChannelPage = () => {
//   const { uname } = useParams();
//   const query = useQuery();
//   const phoneNumber = query.get("phoneNumber");
//   const selectedAvatar = query.get("selectedAvatar");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // 상태 변수들
//   const [overlayVideo, setOverlayVideo] = useState(null);
//   const [isSeamlessPlaying, setIsSeamlessPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAnswerButtonEnabled, setIsAnswerButtonEnabled] = useState(true);
//   const [showInstruction, setShowInstruction] = useState(true);
//   const [isSeamlessLoading, setIsSeamlessLoading] = useState(false);
//   const [timestampsArray, setTimestampsArray] = useState([]); // 타임스탬프 저장 배열 추가
//   const [isErrorOccurred, setIsErrorOccurred] = useState(false);

//   const greetingsVideoRef = useRef(null);
//   const isRecordingAllowed =
//     overlayVideo === null && !isSeamlessPlaying && !isLoading;

//   // Redux 상태 가져오기
//   const audioSources = useSelector((state) => state.aiConsult.audio);
//   const src = useSelector((state) => state.aiConsult.audio.src);
//   const isGreetingsPlaying = useSelector(
//     (state) => state.aiConsult.audio.isGreetingsPlaying
//   );
//   const isNotePlaying = useSelector(
//     (state) => state.aiConsult.audio.isNotePlaying
//   );
//   const isUploading = useSelector(
//     (state) => state.aiConsult.audio.upload.isLoading
//   );
//   const sessionStatus = useSelector((state) => state.aiConsult.sessionStatus);
//   const isErrorPlaying = useSelector(
//     (state) => state.aiConsult.audio.isErrorPlaying
//   );

//   // 선택된 아바타에 따른 소스 가져오기
//   const defaultSrc = audioSources[selectedAvatar]?.defaultSrc;
//   const greetingsSrc = audioSources[selectedAvatar]?.greetingsSrc;
//   const errorSrc = audioSources[selectedAvatar]?.errorSrc;
//   const noteSrc = audioSources[selectedAvatar]?.noteSrc;
//   const existingSrc = audioSources[selectedAvatar]?.existingSrc;

//   // 배경 이미지 설정
//   let BackgroundImage;
//   if (selectedAvatar === "sonny") {
//     BackgroundImage = BackgroundImage_sonny;
//   } else if (selectedAvatar === "karina") {
//     BackgroundImage = BackgroundImage_karina;
//   } else if (selectedAvatar === "chloe") {
//     BackgroundImage = BackgroundImage_chloe;
//   } else if (selectedAvatar === "dohyung") {
//     BackgroundImage = BackgroundImage_dohyung;
//   } else {
//     BackgroundImage = BackgroundImage_sonny;
//   }

//   // 상담 종료 핸들러
//   const handleEndConsultation = useCallback(() => {
//     dispatch(clearAudioSrc());
//     navigate("/", { replace: true });
//     window.location.reload();
//   }, [navigate, dispatch]);

//   // CSV 저장 함수
//   const saveTimestampsToCSV = (timestampsArray) => {
//     const fields = ["requestSentTime", "firstVideoPlayedTime"];
//     const csvRows = [];
//     csvRows.push(fields.join(",")); // 헤더 추가
//     timestampsArray.forEach((timestamp) => {
//       csvRows.push(
//         [timestamp.requestSentTime, timestamp.firstVideoPlayedTime].join(",")
//       );
//     });
//     const csvContent = csvRows.join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `timestamps_${Date.now()}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   // 종료 버튼 클릭 핸들러 수정
//   const handleExitClick = useCallback(
//     (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       MySwal.fire({
//         title: "상담 종료",
//         text: "정말로 상담을 종료하시겠습니까?",
//         icon: "info",
//         showCancelButton: true,
//         showCloseButton: true, // 우측 상단 X 버튼 추가
//         confirmButtonText: "만족도 조사 하러가기",
//         cancelButtonText: "새로운 심리상담 받기",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // '만족도조사 하러가기' 버튼 클릭 시 실행할 코드
//           // saveTimestampsToCSV(timestampsArray);
//           window.open(
//             "https://docs.google.com/forms/d/e/1FAIpQLScdd0osi9M_RWAnjnCEjaku49Cee7jMhkIpZF9VnUBfzQy2ZQ/viewform"
//           );
//           handleEndConsultation(); // 필요한 경우 유지
//         } else if (result.isDismissed) {
//           if (result.dismiss === Swal.DismissReason.cancel) {
//             // '새로운 심리상담 받기' 버튼 클릭 시 실행할 코드
//             // saveTimestampsToCSV(timestampsArray);
//             window.location.href = `/ai-consultEntryRe?uname=${encodeURIComponent(
//               uname
//             )}&phoneNumber=${encodeURIComponent(phoneNumber)}`;
//           }
//           // 'X' 버튼 클릭 시에는 아무 동작도 하지 않음 (모달이 자동으로 닫힘)
//         }
//       });
//     },
//     [handleEndConsultation, timestampsArray, navigate]
//   );

//   // 페이지 새로고침 방지 핸들러(F5, Ctrl+R 용)
//   const handleRefresh = useCallback((e) => {
//     e.preventDefault();
//     MySwal.fire({
//       title: "알림",
//       html: "우측 하단의 나가기 버튼(문 모양)을 사용해<br>종료 후 처음부터 시작해주세요.",
//       icon: "warning",
//       confirmButtonText: "확인",
//       allowOutsideClick: false, // 팝업 외부 클릭 시 닫히지 않도록 설정
//     }).then(() => {
//       // 팝업 확인 후 아무 동작도 하지 않음 (새로고침 방지)
//     });
//   }, []);

//   // Reload page once on first load
//   // useEffect(() => {
//   //   const hasReloaded = sessionStorage.getItem("hasReloaded");
//   //   if (!hasReloaded) {
//   //     console.log("페이지가 처음 로드되어 리로드합니다.");
//   //     sessionStorage.setItem("hasReloaded", "true");
//   //     window.location.reload();
//   //   } else {
//   //     console.log("페이지가 이미 리로드되었습니다.");
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (isErrorOccurred) {
//       console.log("Error occurred, playing error video");
//       setOverlayVideo(errorSrc);
//       setIsErrorOccurred(false);
//       dispatch(setErrorPlaying());
//     }
//   }, [isErrorOccurred, errorSrc, dispatch]);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
//         e.preventDefault();
//         handleRefresh(e);
//       }
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [handleRefresh]);

//   // // 상태 변화에 따른 비디오 재생 로직
//   // useEffect(() => {
//   //   if (!overlayVideo) {
//   //     if (isGreetingsPlaying && greetingsSrc) {
//   //       console.log("인사말 비디오 재생");
//   //       setOverlayVideo(greetingsSrc);
//   //       setIsSeamlessPlaying(false);
//   //     } else if (src === "error") {
//   //       console.log("에러 비디오 재생");
//   //       setOverlayVideo(errorSrc);
//   //       setIsSeamlessPlaying(false);
//   //       // 에러 비디오 재생을 표시하기 위해 상태 설정
//   //     } else if (isNotePlaying && noteSrc) {
//   //       console.log("노트 비디오 재생");
//   //       setOverlayVideo(noteSrc);
//   //     }
//   //   }

//   //   if (src && !isSeamlessPlaying && src !== "error") {
//   //     console.log("시작하기 seamless 비디오 재생");
//   //     setIsSeamlessPlaying(true);
//   //     setIsLoading(true);
//   //   }
//   // }, [
//   //   overlayVideo,
//   //   isGreetingsPlaying,
//   //   greetingsSrc,
//   //   src,
//   //   errorSrc,
//   //   isNotePlaying,
//   //   noteSrc,
//   //   isSeamlessPlaying,
//   //   dispatch,
//   // ]);

//   // 상태 변화에 따른 비디오 재생 로직
//   useEffect(() => {
//     if (!overlayVideo && !isErrorPlaying) {
//       if (isGreetingsPlaying) {
//         // Determine which source to use based on sessionStatus
//         console.log("sessionStatus: ", sessionStatus);
//         const selectedGreetingsSrc =
//           sessionStatus === "existing_client" ? existingSrc : greetingsSrc;

//         if (selectedGreetingsSrc) {
//           console.log(
//             "인사말 비디오 재생:",
//             selectedGreetingsSrc === existingSrc
//               ? "existingSrc 사용"
//               : "greetingsSrc 사용"
//           );
//           setOverlayVideo(selectedGreetingsSrc);
//           setIsSeamlessPlaying(false);
//         } else {
//           console.warn("선택된 인사말 비디오 소스가 없습니다.");
//         }
//       } else if (src === "error") {
//         console.log("에러 비디오 재생");
//         setOverlayVideo(errorSrc);
//         setIsSeamlessPlaying(false);
//         // 에러 비디오 재생을 표시하기 위해 상태 설정
//       } else if (isNotePlaying && noteSrc) {
//         console.log("노트 비디오 재생");
//         setOverlayVideo(noteSrc);
//       }
//     }

//     if (src && !isSeamlessPlaying && src !== "error") {
//       console.log("시작하기 seamless 비디오 재생");
//       setIsSeamlessPlaying(true);
//       setIsLoading(true);
//     }
//   }, [
//     overlayVideo,
//     isGreetingsPlaying,
//     greetingsSrc,
//     existingSrc, // 올바른 greetingsSrc 추가
//     src,
//     errorSrc,
//     isNotePlaying,
//     noteSrc,
//     isSeamlessPlaying,
//     dispatch,
//     sessionStatus, // Added to dependencies
//     isErrorPlaying,
//   ]);

//   // overlay 비디오 종료 핸들러
//   const handleOverlayVideoEnd = useCallback(() => {
//     console.log("Overlay 비디오 종료");
//     if (isGreetingsPlaying) {
//       dispatch(setGreetingsPlayed());
//     } else if (isNotePlaying) {
//       dispatch(clearNotePlaying());
//     } else if (isErrorPlaying) {
//       dispatch(clearErrorPlaying());
//     }
//     setOverlayVideo(null);
//     setIsAnswerButtonEnabled(true);
//   }, [dispatch, isGreetingsPlaying, isNotePlaying, isErrorPlaying]);

//   // Error handlers for videos
//   const handleDefaultVideoError = useCallback(() => {
//     console.error("Default video failed to play");
//     setIsErrorOccurred(true);
//   }, []);

//   const handleOverlayVideoError = useCallback(() => {
//     console.error("Overlay video failed to play");
//     setIsErrorOccurred(true);
//   }, []);

//   const handleSeamlessVideoError = useCallback(() => {
//     console.error("Seamless video failed to play");
//     setIsSeamlessPlaying(false);
//     setIsLoading(false);
//     setIsErrorOccurred(true);
//   }, []);

//   // seamless 비디오 핸들러들
//   const handleSeamlessVideoEnd = useCallback(() => {
//     console.log("Seamless 비디오 재생 종료");
//     setIsSeamlessPlaying(false);
//     setIsLoading(false);
//     dispatch(clearAudioSrc());
//   }, [dispatch]);

//   const handleSeamlessVideoStart = useCallback(() => {
//     console.log("Seamless 비디오 재생 시작");
//     setIsLoading(false);
//     setIsAnswerButtonEnabled(false);

//     // 타임스탬프 배열의 마지막 객체에 firstVideoPlayedTime 추가
//     setTimestampsArray((prevArray) => {
//       if (prevArray.length === 0) return prevArray;
//       const newArray = [...prevArray];
//       newArray[newArray.length - 1].firstVideoPlayedTime = Date.now();
//       return newArray;
//     });
//   }, []);

//   const handleAllVideosEnded = useCallback(() => {
//     console.log("모든 Seamless 비디오 종료");
//     setIsSeamlessPlaying(false);
//     setIsLoading(false);
//     dispatch(clearAudioSrc());
//     setIsAnswerButtonEnabled(true);
//   }, [dispatch]);

//   const handleGreetingsVideoPlay = () => {
//     console.log("인사말 비디오 재생 시작");
//   };

//   const handleGreetingsVideoError = (e) => {
//     console.error("인사말 비디오 재생 오류:", e);
//   };

//   const handleRecordingStart = () => {
//     console.log("녹음 시작");
//     setShowInstruction(false);
//   };

//   const handleRecordingStop = useCallback((timestamp) => {
//     console.log("녹음 종료");
//     // 타임스탬프 배열에 새로운 객체 추가
//     setTimestampsArray((prevArray) => [
//       ...prevArray,
//       { requestSentTime: timestamp, firstVideoPlayedTime: null },
//     ]);
//   }, []);

//   useEffect(() => {
//     // 컴포넌트가 마운트될 때 현재 상태를 히스토리 스택에 추가
//     window.history.pushState({ preventPop: true }, "");

//     const handlePopState = (event) => {
//       // preventPop이 true인 경우, 사용자에게 확인 팝업을 표시
//       console.log(event.state);
//       console.log(event.state.preventPop);
//       if (event.state || event.state.preventPop) {
//         // SweetAlert2를 사용한 팝업 표시
//         MySwal.fire({
//           title: "알림",
//           html: "우측 하단의 나가기 버튼(문 모양)을 사용해<br>종료 후 처음부터 시작해주세요.",
//           icon: "warning",
//           confirmButtonText: "확인",
//           allowOutsideClick: false, // 팝업 외부 클릭 시 닫히지 않도록 설정
//         }).then(() => {
//           // 사용자가 확인 버튼을 클릭하면 현재 상태를 다시 히스토리 스택에 추가
//           window.history.pushState({ preventPop: true }, "");
//         });
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   // 페이지 새로고침 방지 핸들러(브라우저의 새로고침 버튼)
//   // useEffect(() => {
//   //   const handleBeforeUnload = (e) => {
//   //     e.preventDefault();
//   //     // Chrome requires returnValue to be set
//   //     e.returnValue = "";
//   //     // Note: Custom messages are not supported by most browsers
//   //   };

//   //   window.addEventListener("beforeunload", handleBeforeUnload);

//   //   return () => {
//   //     window.removeEventListener("beforeunload", handleBeforeUnload);
//   //   };
//   // }, []);

//   return (
//     <Box width="100%" height="100vh">
//       <Box
//         width="100%"
//         height="90%"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         position="relative"
//       >
//         {/* 배경 이미지 */}
//         <Box
//           component="img"
//           src={BackgroundImage}
//           alt="Background"
//           position="absolute"
//           height="100%"
//           objectFit="cover"
//           zIndex={0}
//           sx={{
//             display: { xs: "none", md: "block" },
//             border: "none",
//           }}
//         />

//         {/* default 비디오 */}
//         <Box
//           component="video"
//           width="100%"
//           height="100%"
//           top={0}
//           left={0}
//           src={defaultSrc}
//           loop
//           autoPlay
//           muted
//           position="relative"
//           zIndex={1}
//           onError={handleDefaultVideoError} // Added error handler
//         />

//         {/* overlay 비디오 (greetings, note, error 등) */}
//         {overlayVideo && (
//           <Fade in={true}>
//             <Box
//               position="absolute"
//               top={0}
//               left={0}
//               width="100%"
//               height="100%"
//               component="video"
//               ref={greetingsVideoRef}
//               src={overlayVideo}
//               autoPlay
//               onEnded={handleOverlayVideoEnd}
//               onPlay={handleGreetingsVideoPlay}
//               onError={handleOverlayVideoError} // Added error handler
//               zIndex={2}
//             />
//           </Fade>
//         )}

//         {/* seamless 비디오 */}
//         {isSeamlessPlaying && (
//           <Box
//             position="absolute"
//             top={0}
//             left={0}
//             width="100%"
//             height="100%"
//             zIndex={3}
//             sx={{ border: "none" }}
//           >
//             <SeamlessVideoPlayer
//               initialVideoUrl={src}
//               isVisible={isSeamlessPlaying}
//               onEnded={handleAllVideosEnded}
//               onStart={handleSeamlessVideoStart}
//               onAllVideosEnded={handleAllVideosEnded}
//               onError={handleSeamlessVideoError} // Added error handler
//             />
//           </Box>
//         )}

//         {/* 로딩 표시 */}
//         {isLoading && (
//           <Box
//             position="absolute"
//             top={0}
//             left={0}
//             width="100%"
//             height="100%"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             bgcolor="transparent"
//           >
//             <CircularProgress />
//           </Box>
//         )}

//         {isSeamlessLoading && (
//           <Box
//             position="absolute"
//             top={0}
//             left={0}
//             width="100%"
//             height="100%"
//             bgcolor="transparent"
//             zIndex={4}
//           />
//         )}
//       </Box>

//       {/* 로컬 유저 비디오 */}
//       <Box
//         position="absolute"
//         zIndex={999}
//         right={0}
//         bottom={"10%"}
//         width={{ xs: "200px", md: "320px" }}
//         height={{ xs: "120px", md: "200px" }}
//       >
//         <LocalUser />
//       </Box>

//       {/* 하단 컨트롤 바 */}
//       <Box
//         position="relative"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="10%"
//         borderTop={1}
//         borderColor={"#ccc"}
//       >
//         {/* {showInstruction && (
//           <Box
//             position="absolute"
//             margin="auto"
//             display="flex"
//             sx={{
//               transform: "translateX(-65%)",
//               height: { xs: "24px", sm: "40px", md: "50px", lg: "60px" },
//             }}
//           >
//             <img
//               src={Describe1Image}
//               alt="describe1"
//               style={{
//                 width: "auto",
//                 height: "100%",
//               }}
//             />
//           </Box>
//         )} */}

//         {/* 오디오 레코더 */}
//         <AudioRecorder
//           uname={uname}
//           phoneNumber={phoneNumber}
//           selectedAvatar={selectedAvatar}
//           onRecordingStart={handleRecordingStart}
//           onRecordingStop={handleRecordingStop} // 추가된 부분
//           isRecordingAllowed={isRecordingAllowed}
//         />

//         {/* 종료 버튼 */}
//         <Box
//           position="absolute"
//           right="2px"
//           display="flex"
//           alignItems="center"
//           sx={{
//             gap: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
//           }}
//         >
//           {showInstruction && (
//             <Box
//               sx={{
//                 height: { xs: "24px", sm: "40px", md: "50px", lg: "60px" },
//               }}
//             >
//               <img
//                 src={Describe2Image}
//                 alt="describe2"
//                 style={{
//                   width: "auto",
//                   height: "100%",
//                 }}
//               />
//             </Box>
//           )}

//           <Button
//             onClick={handleExitClick}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: { xs: "35px", sm: "45px", md: "55px", lg: "65px" },
//               minWidth: 0,
//             }}
//           >
//             <img
//               src={Exit}
//               alt="exit icon"
//               style={{
//                 width: "auto",
//                 height: "100%",
//               }}
//             />
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AiConsultChannelPage;

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AudioRecorder,
  LocalUser,
  SeamlessVideoPlayer,
} from "@components/index";
import { Button, Box, Fade, CircularProgress } from "@mui/material";
import {
  clearAudioSrc,
  setGreetingsPlayed,
  setNotePlaying,
  clearNotePlaying,
  setErrorPlaying,
  clearErrorPlaying,
} from "@store/ai/aiConsultSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// 아이콘 및 이미지 임포트
import Exit from "@assets/images/exit.png";
import Describe1Image from "@assets/images/describe1.png";
import Describe2Image from "@assets/images/describe2.png";
import BackgroundImage_sonny from "@assets/images/background_sonny.png";
import BackgroundImage_karina from "@assets/images/background_karina.png";
import BackgroundImage_chloe from "@assets/images/background_chloe.png";
import BackgroundImage_dohyung from "@assets/images/background_dohyung.png";

// SweetAlert2 임포트
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AiConsultChannelPage = () => {
  const { uname } = useParams();
  const query = useQuery();
  const phoneNumber = query.get("phoneNumber");
  const selectedAvatar = query.get("selectedAvatar");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 상태 변수들
  const [overlayVideo, setOverlayVideo] = useState(null);
  const [isSeamlessPlaying, setIsSeamlessPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerButtonEnabled, setIsAnswerButtonEnabled] = useState(true);
  const [showInstruction, setShowInstruction] = useState(true);
  const [isSeamlessLoading, setIsSeamlessLoading] = useState(false);
  const [timestampsArray, setTimestampsArray] = useState([]); // 타임스탬프 저장 배열 추가
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  const defaultVideoRef = useRef(null);
  const greetingsVideoRef = useRef(null);
  const isRecordingAllowed =
    overlayVideo === null && !isSeamlessPlaying && !isLoading;

  // Redux 상태 가져오기
  const audioSources = useSelector((state) => state.aiConsult.audio);
  const src = useSelector((state) => state.aiConsult.audio.src);
  const isGreetingsPlaying = useSelector(
    (state) => state.aiConsult.audio.isGreetingsPlaying
  );
  const isNotePlaying = useSelector(
    (state) => state.aiConsult.audio.isNotePlaying
  );
  const isUploading = useSelector(
    (state) => state.aiConsult.audio.upload.isLoading
  );
  const sessionStatus = useSelector((state) => state.aiConsult.sessionStatus);
  const isErrorPlaying = useSelector(
    (state) => state.aiConsult.audio.isErrorPlaying
  );

  // 선택된 아바타에 따른 소스 가져오기
  const defaultSrc = audioSources[selectedAvatar]?.defaultSrc;
  const greetingsSrc = audioSources[selectedAvatar]?.greetingsSrc;
  const errorSrc = audioSources[selectedAvatar]?.errorSrc;
  const noteSrc = audioSources[selectedAvatar]?.noteSrc;
  const existingSrc = audioSources[selectedAvatar]?.existingSrc;

  // 배경 이미지 설정
  let BackgroundImage;
  if (selectedAvatar === "sonny") {
    BackgroundImage = BackgroundImage_sonny;
  } else if (selectedAvatar === "karina") {
    BackgroundImage = BackgroundImage_karina;
  } else if (selectedAvatar === "chloe") {
    BackgroundImage = BackgroundImage_chloe;
  } else if (selectedAvatar === "dohyung") {
    BackgroundImage = BackgroundImage_dohyung;
  } else {
    BackgroundImage = BackgroundImage_sonny;
  }

  // 상담 종료 핸들러
  const handleEndConsultation = useCallback(() => {
    dispatch(clearAudioSrc());
    navigate("/", { replace: true });
    window.location.reload();
  }, [navigate, dispatch]);

  // CSV 저장 함수
  const saveTimestampsToCSV = (timestampsArray) => {
    const fields = ["requestSentTime", "firstVideoPlayedTime"];
    const csvRows = [];
    csvRows.push(fields.join(",")); // 헤더 추가
    timestampsArray.forEach((timestamp) => {
      csvRows.push(
        [timestamp.requestSentTime, timestamp.firstVideoPlayedTime].join(",")
      );
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timestamps_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // 종료 버튼 클릭 핸들러 수정
  const handleExitClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      MySwal.fire({
        title: "상담 종료",
        text: "정말로 상담을 종료하시겠습니까?",
        icon: "info",
        showCancelButton: true,
        showCloseButton: true, // 우측 상단 X 버튼 추가
        confirmButtonText: "만족도 조사 하러가기",
        cancelButtonText: "새로운 심리상담 받기",
      }).then((result) => {
        if (result.isConfirmed) {
          // '만족도조사 하러가기' 버튼 클릭 시 실행할 코드
          // saveTimestampsToCSV(timestampsArray);
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLScdd0osi9M_RWAnjnCEjaku49Cee7jMhkIpZF9VnUBfzQy2ZQ/viewform"
          );
          handleEndConsultation(); // 필요한 경우 유지
        } else if (result.isDismissed) {
          if (result.dismiss === Swal.DismissReason.cancel) {
            // '새로운 심리상담 받기' 버튼 클릭 시 실행할 코드
            // saveTimestampsToCSV(timestampsArray);
            window.location.href = `/ai-consultEntryRe?uname=${encodeURIComponent(
              uname
            )}&phoneNumber=${encodeURIComponent(phoneNumber)}`;
          }
          // 'X' 버튼 클릭 시에는 아무 동작도 하지 않음 (모달이 자동으로 닫힘)
        }
      });
    },
    [handleEndConsultation, timestampsArray, navigate]
  );

  // 페이지 새로고침 방지 핸들러(F5, Ctrl+R 용)
  const handleRefresh = useCallback((e) => {
    e.preventDefault();
    MySwal.fire({
      title: "알림",
      html: "우측 하단의 나가기 버튼(문 모양)을 사용해<br>종료 후 처음부터 시작해주세요.",
      icon: "warning",
      confirmButtonText: "확인",
      allowOutsideClick: false, // 팝업 외부 클릭 시 닫히지 않도록 설정
    }).then(() => {
      // 팝업 확인 후 아무 동작도 하지 않음 (새로고침 방지)
    });
  }, []);

  // 비디오 재생 상태 모니터링을 위한 핸들러들
  const handleDefaultVideoPause = useCallback(() => {
    console.log("기본 비디오가 일시 중지되었습니다.");
    if (
      defaultVideoRef.current &&
      !defaultVideoRef.current.seeking &&
      !defaultVideoRef.current.ended
    ) {
      setIsErrorOccurred(true);
    }
  }, []);

  const handleDefaultVideoStalled = useCallback(() => {
    console.log("기본 비디오 재생이 멈췄습니다.");
    setIsErrorOccurred(true);
  }, []);

  const handleDefaultVideoError = useCallback(() => {
    console.error("기본 비디오 재생 오류");
    setIsErrorOccurred(true);
  }, []);

  // 에러 발생 시 처리
  useEffect(() => {
    if (isErrorOccurred) {
      console.log("Error occurred, playing error video");
      setOverlayVideo(errorSrc);
      setIsErrorOccurred(false);
      dispatch(setErrorPlaying());
    }
  }, [isErrorOccurred, errorSrc, dispatch]);

  // 페이지 새로고침(F5, Ctrl+R) 방지
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
        e.preventDefault();
        handleRefresh(e);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleRefresh]);

  // 상태 변화에 따른 비디오 재생 로직
  useEffect(() => {
    if (!overlayVideo && !isErrorPlaying) {
      if (isGreetingsPlaying) {
        // Determine which source to use based on sessionStatus
        console.log("sessionStatus: ", sessionStatus);
        const selectedGreetingsSrc =
          sessionStatus === "existing_client" ? existingSrc : greetingsSrc;

        if (selectedGreetingsSrc) {
          console.log(
            "인사말 비디오 재생:",
            selectedGreetingsSrc === existingSrc
              ? "existingSrc 사용"
              : "greetingsSrc 사용"
          );
          setOverlayVideo(selectedGreetingsSrc);
          setIsSeamlessPlaying(false);
        } else {
          console.warn("선택된 인사말 비디오 소스가 없습니다.");
        }
      } else if (src === "error") {
        console.log("에러 비디오 재생");
        setOverlayVideo(errorSrc);
        setIsSeamlessPlaying(false);
        // 에러 비디오 재생을 표시하기 위해 상태 설정
      } else if (isNotePlaying && noteSrc) {
        console.log("노트 비디오 재생");
        setOverlayVideo(noteSrc);
      }
    }
    // 이 부분에서 isErrorPlaying 상태를 확인하여 SeamlessVideoPlayer가 다시 시작되지 않도록 함
    if (src && !isSeamlessPlaying && src !== "error" && !isErrorPlaying) {
      console.log("시작하기 seamless 비디오 재생");
      setIsSeamlessPlaying(true);
      setIsLoading(true);
    }
  }, [
    overlayVideo,
    isGreetingsPlaying,
    greetingsSrc,
    existingSrc,
    src,
    errorSrc,
    isNotePlaying,
    noteSrc,
    isSeamlessPlaying,
    dispatch,
    sessionStatus,
    isErrorPlaying,
  ]);

  const handleOverlayVideoEnd = useCallback(() => {
    console.log("오버레이 비디오 종료");
    if (isGreetingsPlaying) {
      dispatch(setGreetingsPlayed());
    } else if (isNotePlaying) {
      dispatch(clearNotePlaying());
    } else if (isErrorPlaying) {
      dispatch(clearErrorPlaying());
      setIsErrorOccurred(false); // 에러 상태 초기화
    }
    setOverlayVideo(null);
    setIsAnswerButtonEnabled(true);
  }, [dispatch, isGreetingsPlaying, isNotePlaying, isErrorPlaying]);

  // Error handlers for videos
  const handleOverlayVideoError = useCallback(() => {
    console.error("Overlay video failed to play");
    setIsErrorOccurred(true);
  }, []);

  const handleSeamlessVideoError = useCallback(() => {
    console.error("Seamless video failed to play or stopped unexpectedly");
    setIsSeamlessPlaying(false);
    setIsLoading(false);
    setIsErrorOccurred(true);
    dispatch(clearAudioSrc()); // src를 초기화하여 다시 시작되지 않도록 함
  }, [dispatch]);

  // seamless 비디오 핸들러들
  const handleSeamlessVideoEnd = useCallback(() => {
    console.log("Seamless 비디오 재생 종료");
    setIsSeamlessPlaying(false);
    setIsLoading(false);
    dispatch(clearAudioSrc());
  }, [dispatch]);

  const handleSeamlessVideoStart = useCallback(() => {
    console.log("Seamless 비디오 재생 시작");
    setIsLoading(false);
    setIsAnswerButtonEnabled(false);

    // 타임스탬프 배열의 마지막 객체에 firstVideoPlayedTime 추가
    setTimestampsArray((prevArray) => {
      if (prevArray.length === 0) return prevArray;
      const newArray = [...prevArray];
      newArray[newArray.length - 1].firstVideoPlayedTime = Date.now();
      return newArray;
    });
  }, []);

  const handleAllVideosEnded = useCallback(() => {
    console.log("모든 Seamless 비디오 종료");
    setIsSeamlessPlaying(false);
    setIsLoading(false);
    dispatch(clearAudioSrc());
    setIsAnswerButtonEnabled(true);
  }, [dispatch]);

  const handleGreetingsVideoPlay = () => {
    console.log("인사말 비디오 재생 시작");
  };

  const handleGreetingsVideoError = (e) => {
    console.error("인사말 비디오 재생 오류:", e);
  };

  const handleRecordingStart = () => {
    console.log("녹음 시작");
    setShowInstruction(false);
  };

  const handleRecordingStop = useCallback((timestamp) => {
    console.log("녹음 종료");
    // 타임스탬프 배열에 새로운 객체 추가
    setTimestampsArray((prevArray) => [
      ...prevArray,
      { requestSentTime: timestamp, firstVideoPlayedTime: null },
    ]);
  }, []);

  // 뒤로 가기 방지 및 팝업 처리
  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 상태를 히스토리 스택에 추가
    window.history.pushState({ preventPop: true }, "");

    const handlePopState = (event) => {
      // preventPop이 true인 경우, 사용자에게 확인 팝업을 표시
      if (event.state && event.state.preventPop) {
        // SweetAlert2를 사용한 팝업 표시
        MySwal.fire({
          title: "알림",
          html: "우측 하단의 나가기 버튼(문 모양)을 사용해<br>종료 후 처음부터 시작해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
          allowOutsideClick: false, // 팝업 외부 클릭 시 닫히지 않도록 설정
        }).then(() => {
          // 사용자가 확인 버튼을 클릭하면 현재 상태를 다시 히스토리 스택에 추가
          window.history.pushState({ preventPop: true }, "");
        });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 오디오 출력 장치 변경 감지 및 처리
  useEffect(() => {
    const handleDeviceChange = () => {
      console.log("Media devices changed.");
      // 비디오 재생 재시작 또는 필요한 처리 수행
      const videoElement = defaultVideoRef.current;
      if (videoElement && videoElement.paused) {
        videoElement.play().catch((error) => {
          console.error("기본 비디오 재생 재시작 실패:", error);
        });
      }
    };
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, []);

  return (
    <Box width="100%" height="100vh">
      <Box
        width="100%"
        height="90%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {/* 배경 이미지 */}
        <Box
          component="img"
          src={BackgroundImage}
          alt="Background"
          position="absolute"
          height="100%"
          objectFit="cover"
          zIndex={0}
          sx={{
            display: { xs: "none", md: "block" },
            border: "none",
          }}
        />

        {/* default 비디오 */}
        <Box
          component="video"
          ref={defaultVideoRef}
          width="100%"
          height="100%"
          top={0}
          left={0}
          src={defaultSrc}
          loop
          autoPlay
          muted // 기본 비디오는 muted 설정
          position="relative"
          zIndex={1}
          onPause={handleDefaultVideoPause}
          onStalled={handleDefaultVideoStalled}
          onError={handleDefaultVideoError}
        />

        {/* overlay 비디오 (greetings, note, error 등) */}
        {overlayVideo && (
          <Fade in={true}>
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              component="video"
              ref={greetingsVideoRef}
              src={overlayVideo}
              autoPlay
              // 오버레이 비디오는 muted를 제거하여 소리가 나오도록 함
              onEnded={handleOverlayVideoEnd}
              onPlay={handleGreetingsVideoPlay}
              onError={handleOverlayVideoError}
              zIndex={2}
            />
          </Fade>
        )}

        {/* seamless 비디오 */}
        {isSeamlessPlaying && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            zIndex={3}
            sx={{ border: "none" }}
          >
            <SeamlessVideoPlayer
              initialVideoUrl={src}
              isVisible={isSeamlessPlaying}
              onEnded={handleAllVideosEnded}
              onStart={handleSeamlessVideoStart}
              onAllVideosEnded={handleAllVideosEnded}
              onError={handleSeamlessVideoError}
            />
          </Box>
        )}

        {/* 로딩 표시 */}
        {isLoading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="transparent"
          >
            <CircularProgress />
          </Box>
        )}

        {isSeamlessLoading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="transparent"
            zIndex={4}
          />
        )}
      </Box>

      {/* 로컬 유저 비디오 */}
      <Box
        position="absolute"
        zIndex={999}
        right={0}
        bottom={"10%"}
        width={{ xs: "200px", md: "320px" }}
        height={{ xs: "120px", md: "200px" }}
      >
        <LocalUser />
      </Box>

      {/* 하단 컨트롤 바 */}
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10%"
        borderTop={1}
        borderColor={"#ccc"}
      >
        {/* 오디오 레코더 */}
        <AudioRecorder
          uname={uname}
          phoneNumber={phoneNumber}
          selectedAvatar={selectedAvatar}
          onRecordingStart={handleRecordingStart}
          onRecordingStop={handleRecordingStop}
          isRecordingAllowed={isRecordingAllowed}
        />

        {/* 종료 버튼 */}
        <Box
          position="absolute"
          right="2px"
          display="flex"
          alignItems="center"
          sx={{
            gap: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
          }}
        >
          {showInstruction && (
            <Box
              sx={{
                height: { xs: "24px", sm: "40px", md: "50px", lg: "60px" },
              }}
            >
              <img
                src={Describe2Image}
                alt="describe2"
                style={{
                  width: "auto",
                  height: "100%",
                }}
              />
            </Box>
          )}

          <Button
            onClick={handleExitClick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "35px", sm: "45px", md: "55px", lg: "65px" },
              minWidth: 0,
            }}
          >
            <img
              src={Exit}
              alt="exit icon"
              style={{
                width: "auto",
                height: "100%",
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AiConsultChannelPage;
