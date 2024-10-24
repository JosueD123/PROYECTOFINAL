import { Request, Response } from 'express';
import Candidate from '../models/Candidate';

export const voteForCandidate = async (req: Request, res: Response) => {
  const { candidateId } = req.body;

  try {
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });
    res.status(200).json({ message: 'Voto registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el voto.' });
  }
};

export const getResultsByCampaign = async (req: Request, res: Response) => {
  const { campaignId } = req.params;

  try {
    const candidates = await Candidate.find({ campaign: campaignId }).populate('campaign');
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los resultados.' });
  }
};
