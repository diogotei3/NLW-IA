import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2 } from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";

export function App() {
  return (
      <div className="min-h-screen flex flex-col"> {/*tela*/ }
        
        <div className="px-6 py-3 flex items-center justify-between border-b"> {/*header*/ }
          <h1 className="text-xl font-bold">Upload.ai</h1>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              Desenvolvido com 🔥 no NLW da Rocketseat
            </span>

            <Separator orientation="vertical" className="h-6"></Separator>

            <Button variant={"secondary"}>
              <Github className="w-4 h-4 mr-2"></Github>
              GitHub
            </Button>
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4"> {/*conteudo esquerda*/ }
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea className='resize-none p-4 leading-relaxed' placeholder="Inclua o prompt para a IA..."></Textarea>
              <Textarea className='resize-none p-4 leading-relaxed' placeholder="Resultado gerado pela IA..." readOnly></Textarea>
            </div>
            <p className="text-muted-foreground text-sm">Lembre-se: Você pode utilizar a variavel <code className="text-orange-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcição do vídeo selecionado.</p>
          </div> 

          <aside className="w-80 space-y-6"> {/*conteudo direita*/ }
            <form className="space-y-6">
              <label 
                htmlFor="video"
                className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
                <FileVideo/>
                Carregar video
              </label>

              <input type="file" id="video" accept="video/mp4" className="sr-only"/> {/*oculta input mas leitor ainda ve*/}
            
              <Separator/>

              <div className="space-y-2">
                <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
                <Textarea 
                  id="transcription_prompt" 
                  className="h-28 leading-relaxed resize-none"
                  placeholder="Inclua palavras-chaves mencionadas no vídeo separadas por vírgula ( , )"/>
              </div>
            
              <Button type="submit" className="w-full"> 
                Carregar video
                <Upload className="w-4 h-4 ml-2"/>
              </Button>
            </form>

            <Separator/>

            <form className="space-y-6">

            <div className="space-y-2">
                <Label>Prompt</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um prompt"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Título do Youtube</SelectItem> 
                    <SelectItem value="description">Descrição do Youtube</SelectItem> 

                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">
                  Você poderá custumizar em breve
                </span>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select defaultValue="gpt3.5" disabled>
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem> 
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">
                  Você poderá custumizar em breve
                </span>
              </div>

              <Separator/>

              <div className="space-y-4">
                <Label>Temperatura</Label>
                <Slider min={0} max={1} step={0.1}></Slider>
                <span className="block leading-relaxed text-xs text-muted-foreground italic">
                  Valores mais altos tendem a deixar o valor mais criativo porém com margem de erro
                </span>
              </div>

              <Separator/>

              <Button type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2"/>
              </Button>

            </form>
          </aside> 
        </main>

      </div>
  )
}

