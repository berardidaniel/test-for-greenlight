import { NextRequest, NextResponse } from "next/server";
import taskMock from "../../../../tasksMock";
import type { Task } from "../../../../types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    return NextResponse.json(
      { data: taskMock.find((task: Task) => task.id === Number(id)) },
      { status: 200 },
    );
  } catch (e) {
    throw new Error(`Task not found ${e}`);
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await request.json();

  try {
    const newCopy = [...taskMock];
    newCopy.find((task: Task) => task.id === Number(id)).completed =
      data.completed;
  } catch (e) {
    throw new Error(`Error updating task: ${e}`);
  }

  return NextResponse.json({ data: taskMock }, { status: 200 });
}
