// SWR
import useSWR, { Fetcher, mutate } from "swr"

// Clerk
import { UserButton, useUser } from "@clerk/nextjs"

// Shadcn
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// Form
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Types
import { Event } from "@prisma/client"
import Link from "next/link"
import { RotateCw } from "lucide-react"

const formSchema = z.object({
  locationTitle: z.string().min(2, {
    message: "Mekan adı en az iki harfli olmalıdır."
  })
})

const fetcher: Fetcher<Event, string> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }

  return res.json()
}

// TODO: Extract component
function EventForm() {
  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationTitle: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      const data = {
        locationTitle: values.locationTitle
      }

      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            mutate("/api/events/latest")
            toast("Etkinlik oluşturuldu, aksiyon zamanı!")
          } else {
            throw new Error()
          }
        })
        .catch(() => toast.error("Etkinlik oluşturulamadı, tekrar dener misin?"))
    }
  }

  return (
    <div className='border rounded p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='locationTitle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mekanın İsmi</FormLabel>
                <FormControl>
                  <Input placeholder='Oturan Boğa' {...field} />
                </FormControl>
                <FormDescription>Etkinliğin gerçekleşeceği mekanın ismi.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-green-600 hover:bg-green-500 w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <RotateCw className='mr-2 h-4 w-4 animate-spin' />}
            <p className='text-lg'>Etkinliği Oluştur</p>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default function DjHomePage() {
  const { data, error } = useSWR("/api/events/latest", fetcher, {
    revalidateOnMount: true
  })

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='container flex flex-row items-center justify-between align-center py-4'>
          <h2 className='text-lg font-semibold'>İstek Müzik</h2>
          <UserButton afterSignOutUrl='/' />
        </div>

        <Separator />

        <div className='container flex flex-col space-y-3 py-4 h-full'>
          {error ? (
            <>
              <EventForm />
              <Button variant='secondary' className='bg-blue-400 hover:bg-blue-300'>
                <p className='text-lg'>Tavsiyelerini Düzenle</p>
              </Button>
            </>
          ) : (
            // TODO: Extract to component
            data && (
              <>
                <div className='flex flex-col space-y-2'>
                  <>
                    <h2 className='text-xl'>Etkinlikler</h2>
                    {data && (
                      <div key={data.id} className='flex flex-row space-x-3 items-center'>
                        <div className='w-20 h-20 bg-slate-100 border rounded shadow-sm'></div>
                        <div className='flex flex-col space-y-2'>
                          <p className='text-lg'>{data.locationTitle}</p>
                          <p className='text-lg font-light'>
                            {data.startedAt ? data.startedAt.toLocaleString() : "Etkinlik Henüz Başlamadı"}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                </div>

                <div className='flex flex-col space-y-2'>
                  {data && (
                    <Button className='bg-green-600 hover:bg-green-500' asChild>
                      <Link href={`/events/${data.id}`}>
                        <p className='text-lg'>Etkinliğe Git</p>
                      </Link>
                    </Button>
                  )}
                  <Button variant='secondary' className='bg-blue-400 hover:bg-blue-300'>
                    <p className='text-lg'>Tavsiyelerini Düzenle</p>
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  )
}
