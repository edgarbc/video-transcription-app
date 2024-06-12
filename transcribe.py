import whisper
import sys
from moviepy.editor import VideoFileClip

def extract_audio_from_video(video_path, audio_output_path):
    """
    Extract audio from a video file and save it to a new file.
    Args:

        video_path: str, path to the video file
        audio_output_path: str, path to save the audio file
    Returns: 
        None
    """

    try:
        # Load the video file
        video_clip = VideoFileClip(video_path)
        
        # Extract the audio
        audio_clip = video_clip.audio
        
        # Write the audio to a file
        audio_clip.write_audiofile(audio_output_path)
        
        print(f"Audio extracted and saved to {audio_output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")


def transcribe(file_path):
    model = whisper.load_model("base")

    print("Transcribing...")
    print(model)

    result = model.transcribe(file_path)
    return result["text"]


if __name__ == "__main__":
    file_path = "sample.mp3"
    print(transcribe(file_path))


