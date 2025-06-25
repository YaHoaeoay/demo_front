from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
import openai
import os
import requests
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont
import textwrap

# 환경변수 로드
load_dotenv("key.env")
openai.api_key = os.getenv("OPENAI_API_KEY")

# FastAPI 앱 생성
app = FastAPI()

# 이미지 생성 함수 (텍스트 없는 배경만)
def generate_background_image(prompt: str, index: int) -> str:
    try:
        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="url"
        )
        image_url = response.data[0].url
        os.makedirs("output", exist_ok=True)
        image_data = requests.get(image_url).content
        bg_path = f"output/flyer_{index}_bg.png"
        with open(bg_path, "wb") as f:
            f.write(image_data)
        return bg_path
    except Exception as e:
        print(f"이미지 생성 실패: {e}")
        return ""

# 텍스트를 이미지 하단에 가독성 있게 삽입
def add_text_to_image(image_path: str, title: str, body: str, index: int) -> str:
    try:
        img = Image.open(image_path).convert("RGB")
        draw = ImageDraw.Draw(img)

        font_path = "./font/Pretendard-Bold.ttf"
        if not os.path.exists(font_path):
            raise FileNotFoundError("폰트 파일이 없습니다.")

        font_title = ImageFont.truetype(font_path, size=64)
        font_body = ImageFont.truetype(font_path, size=36)

        width, height = img.size

        margin = 40
        spacing = 20

        wrapped_body = textwrap.fill(body, width=28)
        title_size = draw.textbbox((0, 0), title, font=font_title)
        body_size = draw.multiline_textbbox((0, 0), wrapped_body, font=font_body, spacing=spacing)

        box_height = (title_size[3] - title_size[1]) + (body_size[3] - body_size[1]) + 3 * spacing
        box_top = height - box_height - margin
        box_bottom = height - margin

        # 반투명 흰색 박스
        draw.rectangle(
            [(margin, box_top), (width - margin, box_bottom)],
            fill=(255, 255, 255, 230)
        )

        # 텍스트 삽입
        draw.text((margin + 10, box_top + spacing), title, font=font_title, fill=(0, 0, 0))
        draw.multiline_text(
            (margin + 10, box_top + spacing + (title_size[3] - title_size[1]) + spacing),
            wrapped_body,
            font=font_body,
            fill=(0, 0, 0),
            spacing=spacing
        )

        out_path = f"output/flyer_{index}.png"
        img.save(out_path)
        return out_path
    except Exception as e:
        print(f"텍스트 삽입 실패: {e}")
        return ""

# API 엔드포인트
@app.post("/generate-flyer")
async def generate_flyer(user_text: str = Form(...)):
    prompt = (
        f"{user_text} 라는 내용을 바탕으로 전단지용 문구 예시를 한국어로 2세트 만들어줘.\n"
        f"전단지에는 한국어 문장이 들어가야 해.\n"
        f"각 세트는 아래 형식을 정확히 따라:\n"
        f"[제목]\n...\n\n[홍보문구]\n...\n\n"
        f"옵션 번호, 설명, 구분선 없이 형식만 지켜줘."
    )

    completion = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    flyer_text = completion.choices[0].message.content.strip()

    results = []
    entries = flyer_text.split("[제목]")
    for i, entry in enumerate(entries[1:], start=1):
        try:
            title = entry.split("[홍보문구]")[0].strip()
            body = entry.split("[홍보문구]")[1].strip()
            dalle_prompt = "한국 수박가게 여름 전단지 배경, 텍스트 없이 시원한 느낌, 수박과 햇살, 귀여운 한국 스타일"
            bg_path = generate_background_image(dalle_prompt, i)
            if bg_path:
                result_path = add_text_to_image(bg_path, title, body, i)
                results.append(result_path)
        except Exception as e:
            print(f"[{i}] 파싱 또는 생성 오류: {e}")

    return JSONResponse(content={"images": results})



"""
C:\Python\python.exe -m uvicorn main:app --reload

curl -X POST "http://127.0.0.1:8000/generate-flyer" -H "Content-Type: application/x-www-form-urlencoded" -d "user_text=우리 가게는 여름 한정 수박을 판매하며, 아주 달고 시원합니다."

"""
