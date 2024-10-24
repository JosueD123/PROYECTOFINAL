import { Request, Response } from 'express';
import Candidate from '../models/Candidate';
import Campaign from '../models/Campaign';

export const addCandidate = async (req: Request, res: Response) => {
  const { name, campaignId } = req.body;

  try {
    const newCandidate = new Candidate({ name, campaign: campaignId });
    await newCandidate.save();
    await Campaign.findByIdAndUpdate(campaignId, { $push: { candidates: newCandidate._id } });
    res.status(201).json({ message: 'Candidato agregado exitosamente.', candidate: newCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el candidato.' });
  }
};

export const getCandidatesByCampaign = async (req: Request, res: Response) => {
  const { campaignId } = req.params;

  try {
    const candidates = await Candidate.find({ campaign: campaignId });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los candidatos.' });
  }
};
