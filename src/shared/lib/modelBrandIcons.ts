import AnthropicIcon from '../../assets/icons/model-brand/claude.svg?url';
import GoogleIcon from '../../assets/icons/model-brand/gemini.svg?url';
import OpenAIIcon from '../../assets/icons/model-brand/icon-gpt.svg?url';
import MetaIcon from '../../assets/icons/model-brand/icon-meta.svg?url';
import MistralIcon from '../../assets/icons/model-brand/icon-mistral.svg?url';
import AlibabaCloudIcon from '../../assets/icons/model-brand/qwen2.png?url';
// import JinaAIIcon from '../../assets/icons/model-brand/other.svg?url';
// import BAAIIcon from '../../assets/icons/model-brand/other.svg?url';
import TSystemsIcon from '../../assets/icons/model-brand/t-systems.png?url';
import OtherIcon from '../../assets/icons/model-brand/other.svg?url';

export const modelBrandIcons: Record<string, string> = {
  Anthropic: AnthropicIcon,
  Google: GoogleIcon,
  OpenAI: OpenAIIcon,
  Meta: MetaIcon,
  Mistral: MistralIcon,
  'Alibaba Cloud': AlibabaCloudIcon,
  // 'Jina AI': JinaAIIcon,
  // BAAI: BAAIIcon,
  'T-Systems': TSystemsIcon,
  Other: OtherIcon,
};

export function getModelBrandIcon(name: string): string {
  return modelBrandIcons[name] || '';
}