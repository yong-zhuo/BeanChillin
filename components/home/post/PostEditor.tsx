"use client";

import {
  CreatePostType,
  createPostSchema,
} from "@/lib/schemas/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { postCloudUpload } from "@/lib/cloudinary/CloudinaryUpload";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { UserContext } from "../UserContext";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { ArrowRightToLine, Loader2 } from "lucide-react";

interface PostEditorProps {
  groupId: string;
}

const PostEditor = ({ groupId }: PostEditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      groupId,
      title: "",
      content: null,
    },
  });

  const { user } = useContext(UserContext);

  const { toast } = useToast();

  const ref = useRef<EditorJS>();

  const [isMounted, setIsMounted] = useState(false);

  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const pathname = usePathname();

  const router = useRouter();

  const [isloading, setIsLoading] = useState(false);

  const onSubmit = async (data: CreatePostType) => {
    setIsLoading(true);

    const blocks = await ref.current?.save();

    const payload = {
      title: data.title,
      content: blocks,
      groupId: data.groupId,
      userId: user?.id,
    };

    const newPathname = pathname.split("/").slice(0, -1).join("/");

    router.prefetch(newPathname);

    try {
      const res = await fetch("/api/group/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        if (res.status === 403) {
          toast({
            title: "Error creating post!",
            description: "Please join the group to post",
            variant: "destructive",
          });
          router.push(newPathname);
        } else {
          toast({
            title: "Error creating post!",
            description: "An unexpected error occurred. Try again later.",
            variant: "destructive",
          });
          router.push(newPathname);
        }
      } else {
        //change pathname to group page

        router.push(newPathname);

        router.refresh();

        toast({
          title: "Post created!",
          description: "Your post has been successfully created!",
          variant: "event",
        });
      }
    } catch (error) {
      toast({
        title: "Unable to create post.",
        description: "Please try again later.",
        variant: "destructive",
      });
      router.push(newPathname);
    }
  };

  const initEditor = useCallback(async () => {
    const Editor = (await import("@editorjs/editorjs")).default;
    //const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    //const Table = (await import("@editorjs/table")).default;
    //const List = (await import("@editorjs/list")).default;
    //const Code = (await import("@editorjs/code")).default;
    const Link = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Image = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new Editor({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Start writing your post here!",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          linkTool: {
            class: Link,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: Image,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await postCloudUpload(file);

                  return {
                    success: 1,
                    file: {
                      url: url,
                    },
                  };
                },
              },
            },
          },
          inlineCode: InlineCode,
          embed: Embed,
        },
      });
    }
  }, []);

  //check if server or client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Error creating post!",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initEditor();

      //move to end of callstack
      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      //cleanup function
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initEditor]);

  const { ref: titleRef, ...rest } = register("title");

  return (
    <>
      <div className="w-full rounded-lg border border-pri bg-white p-4 ">
        <form
          id="group-post"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-slate-500 ">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e);
                //@ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Add your title here!"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl font-bold text-gray-900 focus:outline-none"
            />
            <div className="flex flex-col items-start justify-start">
              <div id="editor" className=" min-h-[300px] text-gray-900" />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  /
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="-mt-5 mb-5 flex w-full justify-end">
        <Button
          disabled={isloading}
          className="mt-2 w-fit bg-pri text-white transition hover:scale-105 hover:bg-slate-500"
          form="group-post"
          type="submit"
        >
          {isloading ? (
            <div className="flex flex-row gap-0.5">
              Posting <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-row gap-0.5">
              Post <ArrowRightToLine className="h-5 w-5" />
            </div>
          )}
        </Button>
      </div>
    </>
  );
};

export default PostEditor;
