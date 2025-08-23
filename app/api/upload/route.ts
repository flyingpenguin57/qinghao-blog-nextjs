import { ResponseUtil } from "@/app/lib/api";
import { bizErrors } from "@/app/lib/constants";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json(ResponseUtil.fail(bizErrors.FILE_NOT_FOUND.message, bizErrors.FILE_NOT_FOUND.code));
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true
  });

  return NextResponse.json(ResponseUtil.ok(blob));
}
