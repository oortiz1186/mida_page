import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log(JSON.stringify(body, null, 2));

    return NextResponse.json({
      success: true,
      recibido: body
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error: "error"
    });

  }

}