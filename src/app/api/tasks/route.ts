import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("🚀 ~ POST ~ data:", data);

  if (data.id) {
    throw new Error("No ID");
  }

  return NextResponse.json(
    { message: "Data received successfully", receivedData: data },
    { status: 201 },
  );
}

export async function GET() {
  return NextResponse.json(
    { data: [{ id: 1, taskName: "__TASK_NAME__", completed: false }] },
    { status: 200 },
  );
}
